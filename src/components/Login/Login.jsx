import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";
import { useAuth } from "../../context/AuthContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login, loginWithGoogle, loginWithFacebook, user,saveUserToDB } = useAuth();

  // Redirect if already logged in
  useEffect(() => {
    if (user) {
      navigate("/profile");
    }
  }, [user, navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    if (!email || !password) {
      setError("Email and password are required!");
      return;
    }
    try {
      await login(email, password);
      saveUserToDB()
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

        {/* Login Form */}
        <form onSubmit={handleLogin} className="flex flex-col gap-4 w-full p-4 border rounded-lg bg-gray-50 shadow-sm">
          <label className="text-sm font-medium text-gray-700 text-left">Email Address</label>
          <input 
            type="email"
            placeholder="Enter your email"
            className="border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 transition-all"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <label className="text-sm font-medium text-gray-700 text-left">Password</label>
          <input 
            type="password"
            placeholder="Enter your password"
            className="border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 transition-all"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button 
            type="submit" 
            className="bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
          >
            Sign In
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center my-6">
          <hr className="flex-grow border-gray-300" />
          <span className="px-3 text-gray-500 text-sm">OR</span>
          <hr className="flex-grow border-gray-300" />
        </div>

        {/* Social Login Buttons */}
        <div className="flex flex-col items-center gap-4 p-4">
        <button 
  onClick={loginWithGoogle} 
  className="w-12 h-12 flex items-center justify-center bg-white text-black rounded-full border border-gray-300 hover:bg-gray-100 transition-all"
>
  <FcGoogle size={24} />
</button>
          {/* <button 
            onClick={loginWithFacebook} 
            className="w-full flex items-center justify-center bg-white text-black py-2 rounded-lg border border-gray-300 hover:bg-gray-100 transition-all gap-3 shadow-sm"
          >
            <FaFacebook size={24} className="text-blue-600" /> <span className="font-medium">Facebook</span>
          </button> */}
        </div>

        <p className="mt-4">Don't have an account? <Link to="/signup" className="text-blue-600">Sign up</Link></p>
      </div>
    </div>
  );
}
