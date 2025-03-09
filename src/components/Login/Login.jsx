import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { account } from "../../appwriteConfig";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";

export default function Login() {
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const getUser = async () => {
      try {
        const loggedInUser = await account.get();
        setUser(loggedInUser);
        navigate("/profile");
      } catch (error) {
        console.log("Not logged in");
      }
    };
    getUser();
  }, [navigate]);

  const handleGoogleLogin = async () => {
    try {
      await account.createOAuth2Session(
        "google",
        window.location.origin + "/profile",
        window.location.origin + "/login"
      );
    } catch (error) {
      console.error("Google login failed:", error);
    }
  };

  const handleFacebookLogin = async () => {
    try {
      await account.createOAuth2Session(
        "facebook",
        window.location.origin + "/profile",
        window.location.origin + "/login"
      );
    } catch (error) {
      console.error("Facebook login failed:", error);
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await account.create("unique()", email, password);
      await account.createEmailSession(email, password);
      navigate("/profile");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white p-6">
  <div className="bg-white shadow-xl rounded-lg p-8 w-full max-w-md text-center">
    <h2 className="text-2xl font-semibold mb-6 text-gray-800">Sign in to your account</h2>
    {error && <p className="text-red-500 mb-3 text-sm">{error}</p>}
    
    <div className="flex flex-col items-center gap-4 p-4 border rounded-lg bg-gray-50 shadow-sm w-full">
      <button 
        onClick={handleGoogleLogin} 
        className="w-full flex items-center justify-center bg-white text-black py-2 rounded-lg border border-gray-300 hover:bg-gray-100 transition-all gap-3 shadow-sm"
      >
  <FcGoogle size={24} /> <span className="font-medium"> Google</span>
      </button>
      <button 
        onClick={handleFacebookLogin} 
        className="w-full flex items-center justify-center bg-white text-black py-2 rounded-lg border border-gray-300 hover:bg-gray-100 transition-all gap-3 shadow-sm"
      >
        <FaFacebook size={24} className="text-blue-600" /> <span className="font-medium"> Facebook</span>
      </button>
    </div>
    
    <div className="flex items-center my-6">
      <hr className="flex-grow border-gray-300" />
      <span className="px-3 text-gray-500 text-sm">OR</span>
      <hr className="flex-grow border-gray-300" />
    </div>
    
    <form onSubmit={handleSignup} className="flex flex-col gap-4 w-full p-4 border rounded-lg bg-gray-50 shadow-sm">
      <label className="text-sm font-medium text-gray-700 text-left">Email Address</label>
      <input 
        type="email"
        placeholder="Enter your email"
        className="border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 transition-all"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <button 
        type="submit" 
        className="bg-black text-white py-2 rounded-lg font-medium hover:bg-gray-900 transition-all"
      >
        Continue
      </button>
    </form>
  </div>
</div>

  );
}
