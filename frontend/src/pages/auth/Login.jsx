import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const Login = () => {
    const navigate = useNavigate();
    const { login } = useAuth();

    const [form, setForm] = useState({
        email: "", 
        password: "",
    });
    const [error, setError] = useState(null);
    const [loading, setLoading]= useState(false);

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
            await login(form);
            navigate("/dashboard");
        }catch(err){
            setError(err?.response?.data.error || "Login falied");
        }finally {
            setLoading(false);
        }
    };

    return (
        <div> 
            <h2>Login</h2>
            {error && <p style={{ color: "red" }}>{error}</p>}
            <form onSubmit={handleSubmit}>
                <div>
                    <input  
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={form.email}
                    onChange={handleChange}
                    required
                    />
                    <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={form.password}
                    onChange={handleChange}
                    required
                     />
                </div>

                <button type="submit" disabled={loading}>
                    {loading ? "Loggin in .." : "Login"}
                </button>
            </form>
        </div>
    );
};

export default Login;

