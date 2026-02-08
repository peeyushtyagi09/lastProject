import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";

import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import VerifyEmail from "../pages/auth/VerifyEmail";
import Dashboard from "../pages/Dashboard";
import Landing from "../pages/Landing";

const AppRoutes = () => {
    return (
        <Routes> 
            <Route path="/" element={<Landing />}/>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/verify-email" element={<VerifyEmail />} />

        {/* Protected Routes */}
            <Route path="/dashboard" element={<Dashboard/>}/>
        </Routes>
    );
};

export default AppRoutes;
