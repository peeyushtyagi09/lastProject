import React, { useState } from "react";
import { useProject } from "../../context/Project.Context";

const ProjectCreate = () => {
    const { createProject } = useProject();
    const [form, setForm] = useState({
        projectName: "",
        description: "",
    });
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
        } catch (err) {
            setError(err?.response?.data?.error || "Project is not created");
        } finally {
            setLoading(false);
            setForm({
                projectName: "",
                description: "",
            });
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-blue-100 px-4">
            <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">
                <div className="flex flex-col items-center mb-6">
                    <span className="material-symbols-outlined text-indigo-500 text-5xl mb-2">rocket_launch</span>
                    <h1 className="text-2xl font-bold text-gray-800 mb-1">Create Project</h1>
                    <p className="text-gray-400 text-sm text-center">Start a new project to organize your events and teams.</p>
                </div>
                {error && (
                    <div className="mb-4">
                        <p className="bg-red-100 text-red-700 px-3 py-2 rounded text-sm text-center border border-red-200">
                            {error}
                        </p>
                    </div>
                )}
                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label
                            htmlFor="projectName"
                            className="block text-gray-700 text-sm font-medium mb-1"
                        >
                            Project Name <span className="text-red-500">*</span>
                        </label>
                        <input
                            id="projectName"
                            type="text"
                            name="projectName"
                            value={form.projectName}
                            placeholder="Enter project name"
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-indigo-400 transition text-base bg-gray-50"
                        />
                    </div>
                    <div>
                        <label
                            htmlFor="description"
                            className="block text-gray-700 text-sm font-medium mb-1"
                        >
                            Description
                        </label>
                        <textarea
                            id="description"
                            name="description"
                            value={form.description}
                            placeholder="Enter project description"
                            onChange={handleChange}
                            rows={3}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-indigo-400 transition text-base bg-gray-50 resize-none"
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={loading}
                        className={`w-full py-2 px-4 rounded-lg bg-indigo-600 text-white font-semibold shadow-sm transition 
                            hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2
                            ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
                    >
                        {loading ? (
                            <span>
                                <span className="inline-block mr-2 animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white"></span>
                                Creating Project...
                            </span>
                        ) : (
                            "Create Project"
                        )}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ProjectCreate;