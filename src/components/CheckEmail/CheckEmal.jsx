import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { account } from "../../appwriteConfig";

export default function CheckEmail() {
  const navigate = useNavigate();

  useEffect(() => {
    const checkVerification = async () => {
      try {
        const user = await account.get();
        if (user?.emailVerification) {
          navigate("/profile");
        }
      } catch (error) {
        console.log("Not logged in");
      }
    };
    
    const interval = setInterval(checkVerification, 5000);
    return () => clearInterval(interval);
  }, [navigate]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center p-8 max-w-md">
        <h1 className="text-2xl font-bold mb-4">Check Your Email</h1>
        <p className="text-gray-600 mb-4">
          We've sent a verification link to your email address. 
          Please click the link to verify your account.
        </p>
        <p className="text-gray-500 text-sm">
          Didn't receive the email? Check your spam folder or 
          <button 
            onClick={() => account.createVerification(window.location.origin + "/verify")}
            className="text-blue-600 hover:underline ml-1"
          >
            resend verification email
          </button>
        </p>
      </div>
    </div>
  );
}