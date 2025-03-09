import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { account, databases, DATABASE_ID, USERS_COLLECTION_ID } from "../../appwriteConfig";

const SignUp = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const checkLogin = async () => {
      try {
        const user = await account.get();
        if (user) {
          await saveUserToDB(user);
          navigate("/profile");
        }
      } catch (error) {
        console.log("User not logged in", error.message);
      }
    };
    checkLogin();
  }, [navigate]);

  const handleGoogleSignUp = async () => {
    try {
      await account.createOAuth2Session(
        "google",
        window.location.origin + "/profile",
        window.location.origin + "/signup"
      );
    } catch (error) {
      console.error("Google Sign-Up Error:", error.message);
    }
  };

  const saveUserToDB = async (loggedInUser) => {
    if (!loggedInUser) return;
    try {
      await databases.createDocument(DATABASE_ID, USERS_COLLECTION_ID, loggedInUser.$id, {
        name: loggedInUser.name,
        email: loggedInUser.email,
        provider: "google",
      });
    } catch (error) {
      console.error("User already exists or could not be saved:", error.message);
    }
  };

  return (
    <div className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md text-center">
      <h2 className="text-2xl font-bold mb-4">Sign Up</h2>
      <button
        onClick={handleGoogleSignUp}
        className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 transition"
      >
        Sign Up with Google
      </button>
    </div>
  );
};

export default SignUp;
