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
        <div style={{ padding: "1rem" }}>
            <h1>Dashboard</h1>

            {user && (
                <p>
                    Welcome, {user.username || user.email}
                </p>
            )}

            <div style={{ marginTop: "1rem" }}>
                <button onClick={() => navigate("/create")}>
                    Create Project
                </button>

                <button
                    style={{ marginLeft: "1rem" }}
                    onClick={() => navigate("/list")}
                >
                    Project List
                </button>

                <button
                    style={{ marginLeft: "1rem" }}
                    onClick={handleLogout}
                >
                    Logout
                </button>
            </div>
        </div>
    );
};

export default Dashboard;
