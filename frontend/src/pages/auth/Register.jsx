import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const Register = () => {
    const navigate = useNavigate();
    const { register } = useAuth();

    const [form, setForm] = useState({
        username: "",
        email: "",
        password: "",
    });

    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

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
            await register(form);
            navigate("/verify-email", { state: { email: form.email } });
        } catch (err) {
            setError(err?.response?.data?.error || "Registration failed");
            console.log(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-blue-100 px-4">
            <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">
                <div className="flex flex-col items-center mb-6">
                    <span className="material-symbols-outlined text-blue-500 text-5xl mb-2">person_add</span>
                    <h2 className="text-2xl font-bold text-gray-800 mb-1">Create a new account</h2>
                    <p className="text-gray-400 text-sm">Sign up for free access to your dashboard.</p>
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
                            htmlFor="username"
                            className="block text-gray-700 text-sm font-medium mb-1"
                        >
                            Username
                        </label>
                        <input
                            id="username"
                            type="text"
                            name="username"
                            placeholder="Your username"
                            value={form.username}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-400 transition text-base bg-gray-50"
                        />
                    </div>
                    <div>
                        <label
                            htmlFor="email"
                            className="block text-gray-700 text-sm font-medium mb-1"
                        >
                            Email address
                        </label>
                        <input
                            id="email"
                            type="email"
                            name="email"
                            placeholder="your@email.com"
                            value={form.email}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-400 transition text-base bg-gray-50"
                        />
                    </div>
                    <div>
                        <label
                            htmlFor="password"
                            className="block text-gray-700 text-sm font-medium mb-1"
                        >
                            Password
                        </label>
                        <input
                            id="password"
                            type="password"
                            name="password"
                            placeholder="Create a password"
                            value={form.password}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-400 transition text-base bg-gray-50"
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={loading}
                        className={`w-full flex justify-center items-center px-4 py-2 rounded-lg text-white font-semibold transition 
                            ${loading ? "bg-blue-300" : "bg-blue-600 hover:bg-blue-700"} 
                            focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-offset-1 shadow`}
                    >
                        {loading ? (
                            <>
                                <svg className="animate-spin mr-2 h-5 w-5 text-white inline-block" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                                </svg>
                                Creating account...
                            </>
                        ) : (
                            "Register"
                        )}
                    </button>
                </form>
                <div className="text-center text-sm text-gray-500 mt-6">
                    Already have an account?{" "}
                    <a href="/login" className="text-blue-600 hover:underline font-medium">
                        Sign in
                    </a>
                </div>
            </div>
        </div>
    );
};

export default Register;