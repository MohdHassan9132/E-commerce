import { useEffect } from "react";
import { account } from "../../appwriteConfig";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const logoutUser = async () => {
      try {
        await account.deleteSession("current");
        navigate("/login");
        window.location.reload(); // Force a refresh to update the header
      } catch (error) {
        console.error("Logout Error:", error.message);
      }
    };

    logoutUser();
  }, [navigate]);

  return (
    <div className="text-center mt-10">
      <p className="text-lg font-bold">Logging out...</p>
    </div>
  );
};

export default Logout;
