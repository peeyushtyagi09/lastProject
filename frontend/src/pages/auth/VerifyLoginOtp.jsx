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
        return <p>Invalid flow. Please try login again.</p>;
    }

    return (
        <div>
            <h2>Verify Login OTP</h2>
            <p>OTP sent to: {email}</p>

            {error && <p style={{ color: "red" }}>{error}</p>}

            <form onSubmit={handleVerify}>
                <input
                    type="text"
                    placeholder="Enter OTP"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    required
                />

                <button type="submit" disabled={loading}>
                    {loading ? "Verifying..." : "Verify & Login"}
                </button>
            </form>
        </div>
    );
};

export default VerifyLoginOtp;