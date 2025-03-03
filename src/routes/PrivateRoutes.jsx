import { Navigate } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";

export default function PrivateRoute({ children }) {
  const { isSignedIn } = useUser();

  if (!isSignedIn) {
    return <Navigate to="/login" />;
  }

  return children;
}
