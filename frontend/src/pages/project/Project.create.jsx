import React, {useState} from "react";
import { useProject } from "../../context/Project.Context";

const ProjectCreate = () => {
    const {createProject} = useProject();
    const [form, setForm] = useState({
        projectName: "",
        description: "",
    })
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const handleChange = (e) => {
        setForm({
            ...form, 
            [e.target.name]: e.target.value,
        });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setLoading(true);
        try {
            await createProject(form);
        }catch(err) {
            setError(err?.response?.data?.error || "Project is not created");
        }finally{
            setLoading(false);
            setForm({
                projectName: "",
                description: "",
            });
        }
    }
    return (
        <div>
            <h1>Create project</h1>
            {error && <p style={{ color: "red" }}>{error}</p>}
            <form onSubmit={handleSubmit}>
                <div>
                <input
                type="text"
                name="projectName"
                value={form.projectName}
                placeholder="Enter project Name"
                onChange={handleChange}
                required
                 />
                </div>
                <div>
                <input
                type="text"
                name="description"
                value={form.description}
                placeholder="Enter project description"
                onChange={handleChange}
                 />
                </div>
                <button type="submit" disabled={loading}>
                    {loading ? "Creating Project..." : "Create"}
                </button>
            </form>
        </div>
    )
};

export default ProjectCreate;