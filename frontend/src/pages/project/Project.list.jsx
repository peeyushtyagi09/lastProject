import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useProject } from "../../context/Project.Context";

const ProjectList = () => {
  const { projects, fetchProjects, loading, error } = useProject();
  const navigate = useNavigate();

  useEffect(() => {
    fetchProjects();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  
  if (loading) return <h1>Loading ...</h1>;
  if (error) return <h2 style={{ color: "red" }}>{error}</h2>;

  const projectList = Array.isArray(projects) ? projects : [];

  return (
    <div style={{ maxWidth: "700px", margin: "40px auto" }}>
      <h2>All Projects</h2>
      {projectList.length === 0 ? (
        <p>No projects found.</p>
      ) : (
        projectList.map((p) => (
          <div
            key={p._id}
            style={{
              border: "1px solid #d3d3d3",
              borderRadius: "7px",
              padding: "16px",
              marginBottom: "14px",
              cursor: "pointer",
              background: "#f9f9f9",
              transition: "box-shadow .2s",
            }}
            onClick={() => navigate(`/projects/${p._id}/ingest`)}
            onMouseOver={e => e.currentTarget.style.boxShadow = "0 2px 8px #ddd"}
            onMouseOut={e => e.currentTarget.style.boxShadow = "none"}
          >
            <h3 style={{ margin: "0 0 7px 0" }}>{p.projectName}</h3>
            <div style={{ fontSize: "1rem" }}>{p.description}</div>
          </div>
        ))
      )}
    </div>
  );
};

export default ProjectList;
