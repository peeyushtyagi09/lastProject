import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { verifyLoginOtp } from "../../api/auth.api";
import { useAuth } from "../../context/AuthContext";

const VerifyLoginOtp = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { loginwithTokens } = useAuth();

    const email = location.state?.email;

    const [otp, setOtp] = useState("");
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleVerify = async (e) => {
        e.preventDefault();
        setError(null);
        setLoading(true);

        try {
            const data = await verifyLoginOtp({ email, otp });

            loginwithTokens(data);

            navigate("/dashboard");
        } catch (err) {
            setError(err?.response?.data?.error || "OTP verification failed");
        } finally {
            setLoading(false);
        }
    };

    if (!email) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-blue-100 px-4">
                <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8 flex flex-col items-center">
                    <span className="material-symbols-outlined text-red-500 text-6xl mb-2">warning</span>
                    <h2 className="text-xl font-semibold text-gray-800 mb-2">Invalid flow</h2>
                    <p className="text-gray-500 text-center">Please try logging in again.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-blue-100 px-4">
            <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">
                <div className="flex flex-col items-center mb-6">
                    <span className="material-symbols-outlined text-blue-600 text-5xl mb-2">key</span>
                    <h2 className="text-2xl font-bold text-gray-800 mb-1">Verify Login OTP</h2>
                    <p className="text-gray-400 text-sm">We've sent an OTP to:</p>
                    <span className="text-blue-700 text-base font-medium break-all mb-1">{email}</span>
                </div>

                {error && (
                    <div className="mb-4">
                        <p className="bg-red-100 text-red-700 px-3 py-2 rounded text-sm text-center border border-red-200">
                            {error}
                        </p>
                    </div>
                )}

                <form onSubmit={handleVerify} className="space-y-6">
                    <div>
                        <label
                            htmlFor="otp"
                            className="block text-gray-700 text-sm font-medium mb-1"
                        >
                            Enter OTP
                        </label>
                        <input
                            id="otp"
                            type="text"
                            placeholder="6-digit OTP"
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}
                            required
                            maxLength={8}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-400 transition text-base"
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
                            <span className="flex items-center justify-center">
                                <svg className="animate-spin h-5 w-5 mr-2 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
                                </svg>
                                Verifying...
                            </span>
                        ) : (
                            "Verify & Login"
                        )}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default VerifyLoginOtp;