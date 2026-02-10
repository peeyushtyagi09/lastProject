import React from "react";

const ProjectCreate = () => {
    const [form, setForm] = useState({
        ProjectName: "", 
        description: "",
    });
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    return(
        <div>
            <h1> Create Project</h1>
            <from>
                <input
                type 
                />
                <input/>
            </from>
        </div>
    )
}
export default ProjectCreate;