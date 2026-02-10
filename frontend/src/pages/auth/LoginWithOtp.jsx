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
        <div>
            <h2>Login with OTP</h2>

            {error && <p style={{ color: "red" }}>{error}</p>}

            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />

                <button type="submit" disabled={loading}>
                    {loading ? "Sending OTP..." : "Send OTP"}
                </button>
            </form>
        </div>
    );
}

export default LoginWithOtp;