import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { account } from "../../appwriteConfig";

export default function VerifyEmail() {
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState(null);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const verifyUser = async () => {
      const secret = searchParams.get("secret");
      const userId = searchParams.get("userId");

      if (!secret || !userId) {
        setStatus("Invalid verification link.");
        setLoading(false);
        return;
      }

      try {
        await account.updateVerification(userId, secret);
        setStatus("Email verified successfully! Redirecting to login...");
        
        // Redirect to login after short delay
        setTimeout(() => navigate("/login"), 3000);
      } catch (error) {
        setStatus(`Verification failed: ${error.message}`);
      } finally {
        setLoading(false);
      }
    };

    verifyUser();
  }, [searchParams, navigate]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="p-6 bg-white shadow-lg rounded-md max-w-md text-center">
        <h2 className="text-xl font-bold mb-4">Email Verification</h2>
        {loading ? (
          <p className="text-gray-600">Verifying your email...</p>
        ) : (
          <p className={status.includes("failed") ? "text-red-500" : "text-green-500"}>
            {status}
          </p>
        )}
      </div>
    </div>
  );
}