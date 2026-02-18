import { useEffect } from "react";
import { useRealtimeContext } from "../context/RealTimeContext";

const useRealtime = (projectId) => {
  const {
    subscribeToProject,
    unsubscribeFromProject,
    clearEvents,
  } = useRealtimeContext();

  useEffect(() => {
    if (!projectId) return;

    clearEvents();
    subscribeToProject(projectId);
    console.log("Aaa Aaa");

    return () => {
      unsubscribeFromProject(projectId);
    console.log("ui ui");

      clearEvents();
    };
    // eslint-disable-next-line
  }, [projectId]);
};

export default useRealtime;
