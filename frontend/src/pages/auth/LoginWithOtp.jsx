import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { requestLoginOtp } from "../../api/auth.api";

const LoginWithOtp = () => {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setLoading(true);

        try {
            await requestLoginOtp({ email });

            navigate("/login/otp/verify", {
                state: { email },
            });
        } catch (err) {
            setError(err?.response?.data?.error || "Failed to send OTP");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-blue-100 px-4">
            <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
                <div className="flex flex-col items-center mb-6">
                    <span className="material-symbols-outlined text-blue-500 text-5xl mb-2">mail_lock</span>
                    <h2 className="text-2xl font-bold text-gray-800 mb-1">Login with OTP</h2>
                    <p className="text-gray-400 text-sm">Enter your email to receive a one-time password (OTP).</p>
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
                            htmlFor="email"
                            className="block text-gray-700 text-sm font-medium mb-1"
                        >
                            Email address
                        </label>
                        <input
                            id="email"
                            type="email"
                            placeholder="your@email.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-400 transition text-base bg-gray-50"
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={loading}
                        className={`w-full py-2 px-4 rounded-lg bg-blue-600 text-white font-semibold shadow-sm transition 
                        hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2
                        ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                        {loading ? (
                            <span>
                                <span className="inline-block mr-2 align-middle">
                                    <svg className="animate-spin h-5 w-5 text-white inline-block" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle
                                            className="opacity-25"
                                            cx="12"
                                            cy="12"
                                            r="10"
                                            stroke="currentColor"
                                            strokeWidth="4"
                                        />
                                        <path
                                            className="opacity-75"
                                            fill="currentColor"
                                            d="M4 12a8 8 0 018-8v8H4z"
                                        />
                                    </svg>
                                </span>
                                Sending OTP...
                            </span>
                        ) : (
                            "Send OTP"
                        )}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default LoginWithOtp;