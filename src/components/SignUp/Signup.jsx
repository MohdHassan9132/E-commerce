import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";
import { useAuth } from "../../context/AuthContext";
import { account } from "../../appwriteConfig"; // Needed for OAuth session

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { signup, user,loginWithGoogle,loginWithFacebook } = useAuth();

  // If already logged in, redirect to profile
  useEffect(() => {
    if (user) {
      navigate("/profile");
    }
  }, [user, navigate]);

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");
    if (!name || !email || !password) {
      setError("All fields are required!");
      return;
    }
    try {
      await signup(email, password, name); // Create new user account
      navigate("/login");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white p-6">
      <div className="bg-white shadow-xl rounded-lg p-8 w-full max-w-md text-center">
        <h2 className="text-2xl font-semibold mb-6 text-gray-800">Create a new account</h2>
        {error && <p className="text-red-500 mb-3 text-sm">{error}</p>}
        <div className="flex flex-col items-center gap-4 p-4 border rounded-lg bg-gray-50 shadow-sm w-full">
          <button 
            onClick={loginWithGoogle} 
            className="w-full flex items-center justify-center bg-white text-black py-2 rounded-lg border border-gray-300 hover:bg-gray-100 transition-all gap-3 shadow-sm"
          >
            <FcGoogle size={24} /> <span className="font-medium">Google</span>
          </button>
          <button 
            onClick={loginWithFacebook} 
            className="w-full flex items-center justify-center bg-white text-black py-2 rounded-lg border border-gray-300 hover:bg-gray-100 transition-all gap-3 shadow-sm"
          >
            <FaFacebook size={24} className="text-blue-600" /> <span className="font-medium">Facebook</span>
          </button>
        </div>
        <div className="flex items-center my-6">
          <hr className="flex-grow border-gray-300" />
          <span className="px-3 text-gray-500 text-sm">OR</span>
          <hr className="flex-grow border-gray-300" />
        </div>
        <form onSubmit={handleSignup} className="flex flex-col gap-4 w-full p-4 border rounded-lg bg-gray-50 shadow-sm">
          <label className="text-sm font-medium text-gray-700 text-left">Full Name</label>
          <input 
            type="text"
            placeholder="Enter your full name"
            className="border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 transition-all"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
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
            Sign Up
          </button>
        </form>
        <p className="mt-4">Already have an account? <Link to="/login" className="text-blue-600">Sign in</Link></p>
      </div>
    </div>
  );
}
