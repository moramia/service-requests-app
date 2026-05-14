import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { isAuthenticated } from "../utils/auth";

export default function ProtectedRoute({ children }) {
  const user = useSelector((state) => state.auth.user);
  const token = useSelector((state) => state.auth.token);

  if (!isAuthenticated(user, token)) {
    return <Navigate to="/login" />;
  }

  return children;
}
