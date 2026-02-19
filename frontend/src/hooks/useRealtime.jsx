import { useEffect } from "react";
import { useRealtimeContext } from "../context/RealTimeContext";

/**
 * useRealtime custom hook
 * Handles real-time subscription for the given projectId.
 * Now with improved user feedback using Tailwind CSS notifications!
 */
const useRealtime = (projectId) => {
  const {
    subscribeToProject,
    unsubscribeFromProject,
    clearEvents,
  } = useRealtimeContext();

  useEffect(() => {
    // If no projectId provided, show a warning banner (optional)
    if (!projectId) {
      // Optional: You could render a notification component here.
      const warningBar = document.createElement("div");
      warningBar.className =
        "fixed top-4 left-1/2 -translate-x-1/2 bg-yellow-100 border border-yellow-300 text-yellow-900 px-4 py-2 rounded-md shadow z-50 animate-pulse";
      warningBar.textContent = "No project selected for realtime updates.";
      document.body.appendChild(warningBar);
      setTimeout(() => { warningBar.remove(); }, 2500);
      return;
    }

    // Event clearing notification
    const clearBar = document.createElement("div");
    clearBar.className =
      "fixed top-4 left-1/2 -translate-x-1/2 bg-blue-100 border border-blue-300 text-blue-700 px-4 py-2 rounded-md shadow z-50";
    clearBar.textContent = "Loading latest events...";
    document.body.appendChild(clearBar);

    clearEvents();

    // Show subscription notification
    setTimeout(() => {
      clearBar.textContent = `Subscribed to project ${projectId} (Live updates enabled)`;
      clearBar.className =
        "fixed top-4 left-1/2 -translate-x-1/2 bg-green-100 border border-green-300 text-green-600 px-4 py-2 rounded-md shadow z-50 transition";
    }, 600);

    subscribeToProject(projectId);

    // Remove banner after a few seconds
    const removeTimeout = setTimeout(() => { clearBar.remove(); }, 2000);

    return () => {
      // Show unsubscribing notification
      const unsubBar = document.createElement("div");
      unsubBar.className =
        "fixed top-4 left-1/2 -translate-x-1/2 bg-gray-100 border border-gray-300 text-gray-600 px-4 py-2 rounded-md shadow z-50";
      unsubBar.textContent = `Unsubscribed from project ${projectId}`;
      document.body.appendChild(unsubBar);
      setTimeout(() => { unsubBar.remove(); }, 1500);

      unsubscribeFromProject(projectId);
      clearEvents();
    };
    // eslint-disable-next-line
  }, [projectId]);
};

export default useRealtime;
