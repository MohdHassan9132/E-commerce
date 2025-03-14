import { useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Logout() {
  const { logout } = useAuth(); // Use logout function from AuthContext
  const navigate = useNavigate();

  useEffect(() => {
    const handleLogout = async () => {
      await logout();
      navigate("/login");
    };

    handleLogout();
  }, [logout, navigate]);

  return <p>Logging out...</p>;
}
