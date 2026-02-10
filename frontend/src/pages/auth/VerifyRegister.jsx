import React, {useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";
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
           const data =  await verifyEmail({ email, otp })
            loginwithTokens(data);
            navigate("/login");
        }catch (err) {
            setError(err?.response?.data?.error || "Verification failed");
        }finally {
            setLoading(false);
        }
    };

    const handleResend = async () => {
        setError(null);
        setResendLoading(true);
        
        try {
            await resendVerifyOtp({ email });
        }catch (err){
            setError(err?.response?.data?.error || "Resend failed");
        }finally {
            setResendLoading(false);
        }
    };

    if(!email){
        return <p>Invalid access. Please register again.</p>;
    }
    return (
        <div>
            <h2>Verify Email</h2>
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
                    {loading ? "Verifying..." : "Verify"}
                 </button>

                 <button onClick={handleResend} disabled={resendLoading}>
                    {resendLoading ? "Resending..." : "Resend OTP"}
                 </button>
            </form>
        </div>
    )
}
export default  VerifyEmail;