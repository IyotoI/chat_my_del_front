import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";
import { useEffect } from "react";

export default function ProtectedRoute({ children }) {
  useEffect(() => {
    const cookies = Cookies.get();
    console.log("🚀 ~ ProtectedRoute ~ cookies:", cookies.token);
  }, []);
  // if (!cookies.token) return <Navigate to="/login" />;
  return children;
}
