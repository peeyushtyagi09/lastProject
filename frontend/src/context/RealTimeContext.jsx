import React, { createContext, useContext, useEffect, useRef, useState, useCallback } from "react";
import { createSocketConnection } from "../services/socket";

const RealtimeContext = createContext(undefined);

export const RealtimeProvider = ({ children, token }) => {
  const [events, setEvents] = useState([]);
  const socketRef = useRef(null);

  useEffect(() => {
    // If no token, disconnect any existing socket and return
    if (!token) {
      if (socketRef.current) {
        socketRef.current.disconnect();
        socketRef.current = null;
      }
      console.log("No token");
      return;
    }
    console.log("connection token", token);

    const socket = createSocketConnection(token);
    socketRef.current = socket;

    const handleNewEvent = (eventData) => {
      setEvents((prev) => [eventData, ...prev]);
      console.log("New event received");
    };

    socket.on("new-event", handleNewEvent);

    // Optionally handle reconnects if needed
    socket.on("reconnect", () => {
      // Optionally: Resubscribe to active projects, etc.
      // This is a hook for advanced enhancements.
    });

    // Clean up on unmount or token change
    return () => {
      socket.off("new-event", handleNewEvent);
      socket.disconnect();
      socketRef.current = null;
    };
  }, [token]);

  const subscribeToProject = useCallback((projectId) => {
    if (socketRef.current && projectId) {
      socketRef.current.emit("subscribe", { projectId });
    }
  }, []);

  const unsubscribeFromProject = useCallback((projectId) => {
    if (socketRef.current && projectId) {
      socketRef.current.emit("unsubscribe", { projectId });
    }
  }, []);

  const clearEvents = useCallback(() => {
    setEvents([]);
  }, []);
 

  return (
    <RealtimeContext.Provider
      value={{
        events,
        subscribeToProject,
        unsubscribeFromProject,
        clearEvents,
        // socket,
      }}
    >
      {children}
    </RealtimeContext.Provider>
  );
};

export const useRealtimeContext = () => {
  const context = useContext(RealtimeContext);
  if (!context) {
    throw new Error("useRealtimeContext must be used inside RealtimeProvider");
  }
  return context;
};