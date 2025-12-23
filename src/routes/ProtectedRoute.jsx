import { Navigate, Outlet } from "react-router-dom";
import Cookies from "js-cookie";

const ProtectedRoute = () => {
  const cookies = Cookies.get();

  if (!cookies.token) return <Navigate to="/login" replace />;

  return <Outlet />;
};

export default ProtectedRoute;
