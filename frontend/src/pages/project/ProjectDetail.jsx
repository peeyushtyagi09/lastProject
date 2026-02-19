import React from "react";
import { useParams } from "react-router-dom";
import useRealtime from "../../hooks/useRealtime";
import ActivityFeed from "../../components/ActivityFeed";

const ProjectDetail = () => {
  const { projectId } = useParams();
  useRealtime(projectId);

  return (
    <div className="min-h-screen py-10 px-2 bg-gradient-to-br from-blue-50 via-white to-blue-100">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-2xl p-8 border border-blue-100">
        {/* Header Section */}
        <div className="flex items-center gap-4 mb-8 bg-gradient-to-r from-blue-100 via-white to-blue-200 rounded-lg px-5 py-4 shadow-sm">
          <div className="bg-blue-200 rounded-full h-14 w-14 flex items-center justify-center">
            <span className="material-symbols-outlined text-blue-700 text-4xl">event</span>
          </div>
          <div>
            <h2 className="text-3xl font-extrabold text-blue-800 tracking-tight mb-1">Project Events</h2>
            <p className="text-gray-500 text-md font-medium">Live updates and activity feed for this project</p>
          </div>
        </div>
        {/* ActivityFeed Section */}
        <div className="bg-white rounded-xl px-2 py-4 shadow-inner border border-blue-50 transition-shadow duration-150 hover:shadow-lg">
          <ActivityFeed />
        </div>
      </div>
    </div>
  );
};

export default ProjectDetail;
