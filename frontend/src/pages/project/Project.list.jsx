import React, { useEffect } from "react";
import { useProject } from "../../context/Project.Context";

const ListOfProject = () => {
    const { project, fetchProjects, loading, error } = useProject();

    useEffect(() => {
        fetchProjects();
        // eslint-disable-next-line
    }, []);

    if (loading) return <h1>Loading .....</h1>;
    if (error) return <h2 style={{ color: "red" }}>{error}</h2>;

    // Ensure project is always an array for .map
    const projectList = Array.isArray(project) ? project : [];

    return (
        <div>
            {projectList.length === 0 ? (
                <p>No projects found.</p>
            ) : (
                projectList.map((p) => (
                    <div key={p._id || p.id}>
                        <h1>{p.projectName}</h1>
                        <p>{p.description}</p>
                    </div>
                ))
            )}
        </div>
    );
};

export default ListOfProject;