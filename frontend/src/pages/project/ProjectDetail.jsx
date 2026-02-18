import React from "react";
import { useParams } from "react-router-dom";
import useRealtime from "../../hooks/useRealtime";
import ActivityFeed from "../../components/ActivityFeed";

const ProjectDetail = () => {
  const { projectId } = useParams();

  useRealtime(projectId);

  return (
    <div style={{ padding: "1rem" }}>
      <h2>Project Events</h2>
      <ActivityFeed />
    </div>
  );
};

export default ProjectDetail;
