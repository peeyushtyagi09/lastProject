import { useEffect } from "react";
import { useRealtimeContext } from "../context/RealTimeContext";

const useRealtime = (projectId) => {
  const {
    subscribeToProject,
    unsubscribeFromProject,
    clearEvents,
  } = useRealtimeContext();

  useEffect(() => {
    console.log("[useRealtime] effect triggered", { projectId });
    if (!projectId) {
      console.log("[useRealtime] No projectId provided:", projectId);
      return;
    }

    console.log("[useRealtime] Clearing events for project:", projectId);
    clearEvents();
    console.log("[useRealtime] Subscribing to project:", projectId);
    subscribeToProject(projectId);

    return () => {
      console.log("[useRealtime] Unsubscribing from project:", projectId);
      unsubscribeFromProject(projectId);
      console.log("[useRealtime] Clearing events on cleanup for project:", projectId);
      clearEvents();
    };
    // eslint-disable-next-line
  }, [projectId]);
};

export default useRealtime;
