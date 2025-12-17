import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";

export default function ProtectedRoute({ children }) {
  const cookies = Cookies.get();
  if (!cookies.token) return <Navigate to="/login" />;
  return children;
}
