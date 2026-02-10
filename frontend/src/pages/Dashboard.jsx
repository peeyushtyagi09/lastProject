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
        navigate("/create")
    
    

    return (
        <div>
            <h1>Dashboard</h1>
            {user && <p>Welcome, {user.username || user.email}</p>}
            <button onClick={handleLogout}>Logout</button>
            <button onClick={() => navigate("/create")}>Create</button>
            <button onClick={() => navigate("/list")}>List</button>


        </div>
    );
};

export default Dashboard;