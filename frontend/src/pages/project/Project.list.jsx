import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useProject } from "../../context/Project.Context";

const ProjectList = () => {
  const { projects, fetchProjects, loading, error } = useProject();
  const navigate = useNavigate();

  useEffect(() => {
    fetchProjects();
    // eslint-disable-next-line
  }, []);

  if (loading)
    return (
      <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-blue-50 via-white to-blue-100">
        <span className="text-blue-500 text-xl font-medium">Loading ...</span>
      </div>
    );
  if (error)
    return (
      <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-blue-50 via-white to-blue-100">
        <span className="text-red-600 bg-red-100 border border-red-300 px-4 py-2 rounded">{error}</span>
      </div>
    );

  const projectList = Array.isArray(projects) ? projects : [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 px-4 py-10 flex justify-center">
      <div className="w-full max-w-2xl mx-auto">
        <div className="flex flex-col items-center mb-8">
          <span className="material-symbols-outlined text-indigo-500 text-5xl mb-2">apps</span>
          <h2 className="text-3xl font-bold text-gray-800 mb-2">All Projects</h2>
          <p className="text-gray-500 text-sm">Browse and manage all your projects</p>
        </div>
        {projectList.length === 0 ? (
          <div className="bg-white border border-blue-100 rounded-lg shadow px-6 py-10 flex flex-col items-center">
            <span className="material-symbols-outlined text-blue-200 text-5xl mb-1">folder_off</span>
            <p className="text-gray-500 text-lg font-medium mt-2">No projects found.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {projectList.map((p) => (
              <div
                key={p._id}
                onClick={() => navigate(`/project/${p._id}`)}
                className="cursor-pointer bg-white border border-gray-200 rounded-xl shadow-md hover:shadow-lg transition-shadow p-6 group"
                tabIndex={0}
                role="button"
                aria-label={`View project ${p.projectName}`}
              >
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-indigo-400 text-4xl group-hover:text-indigo-600 transition-colors">rocket_launch</span>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800 group-hover:text-indigo-700 transition-colors mb-1">
                      {p.projectName}
                    </h3>
                    <p className="text-gray-500 text-sm">{p.description || <i>No description</i>}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectList;
