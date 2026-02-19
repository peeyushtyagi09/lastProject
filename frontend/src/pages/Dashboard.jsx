import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Dashboard = () => {
    const navigate = useNavigate();
    const { logout, user } = useAuth();

    const handleLogout = async () => {
        try {
            await logout();
        } finally {
            navigate("/login", { replace: true });
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-slate-100 to-blue-50 px-4">
            <div className="bg-white shadow-xl rounded-2xl p-10 w-full max-w-md">
                <h1 className="text-3xl font-bold text-blue-700 mb-6 text-center">Dashboard</h1>

                {user && (
                    <p className="text-lg text-gray-700 text-center mb-8">
                        Welcome, <span className="font-semibold text-blue-600">{user.username || user.email}</span>
                    </p>
                )}

                <div className="flex flex-col gap-4">
                    <button
                        className="w-full px-5 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 focus:outline-none transition-colors duration-150 shadow-sm"
                        onClick={() => navigate("/create")}
                    >
                        Create Project
                    </button>
                    <button
                        className="w-full px-5 py-3 bg-slate-100 text-blue-700 border border-blue-100 rounded-lg font-medium hover:bg-blue-100 focus:outline-none transition-colors duration-150 shadow-sm"
                        onClick={() => navigate("/list")}
                    >
                        Project List
                    </button>
                    <button
                        className="w-full px-5 py-3 bg-red-500 text-white rounded-lg font-medium hover:bg-red-600 focus:outline-none transition-colors duration-150 mt-2 shadow-sm"
                        onClick={handleLogout}
                    >
                        Logout
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
