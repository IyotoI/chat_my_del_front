import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const keyRoom = localStorage.getItem("keyRoom");

  if (!keyRoom) return <Navigate to="/login" replace />;

  return children;
}
