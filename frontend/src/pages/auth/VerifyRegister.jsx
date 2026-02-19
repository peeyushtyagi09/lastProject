import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { resendVerifyOtp } from "../../api/auth.api";

const VerifyEmail = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { verifyEmail, loginwithTokens } = useAuth();

    const email = location.state?.email;

    const [otp, setOtp] = useState("");
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [resendLoading, setResendLoading] = useState(false);

    const handleVerify = async (e) => {
        e.preventDefault();
        setError(null);
        setLoading(true);

        try {
            const data = await verifyEmail({ email, otp });
            loginwithTokens(data);
            navigate("/login");
        } catch (err) {
            setError(err?.response?.data?.error || "Verification failed");
        } finally {
            setLoading(false);
        }
    };

    const handleResend = async () => {
        setError(null);
        setResendLoading(true);

        try {
            await resendVerifyOtp({ email });
        } catch (err) {
            setError(err?.response?.data?.error || "Resend failed");
        } finally {
            setResendLoading(false);
        }
    };

    if (!email) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-blue-100 px-4">
                <div className="bg-white rounded-xl shadow-lg p-8 max-w-md w-full text-center">
                    <p className="text-red-600 font-semibold">Invalid access. Please register again.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-blue-100 px-4">
            <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">
                <div className="flex flex-col items-center mb-6">
                    <span className="material-symbols-outlined text-blue-500 text-5xl mb-2">mark_email_unread</span>
                    <h2 className="text-2xl font-bold text-gray-800 mb-1">Verify your email</h2>
                    <p className="text-gray-500 text-sm text-center">We've sent a one-time password (OTP) to</p>
                    <p className="font-semibold text-blue-700 text-sm mb-2">{email}</p>
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
                        <label htmlFor="otp" className="block text-gray-700 text-sm font-medium mb-1">
                            Enter OTP
                        </label>
                        <input
                            id="otp"
                            type="text"
                            placeholder="e.g. 123456"
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-400 transition text-base bg-gray-50"
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={loading}
                        className={`w-full py-2 px-4 rounded-lg bg-blue-600 text-white font-semibold shadow-sm transition
                        hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 mb-2
                        ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
                    >
                        {loading ? "Verifying..." : "Verify"}
                    </button>
                    <button
                        type="button"
                        onClick={handleResend}
                        disabled={resendLoading}
                        className={`w-full py-2 px-4 rounded-lg bg-gray-200 text-blue-700 font-semibold shadow-sm transition
                        hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2
                        ${resendLoading ? "opacity-50 cursor-not-allowed" : ""}`}
                    >
                        {resendLoading ? "Resending..." : "Resend OTP"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default VerifyEmail;