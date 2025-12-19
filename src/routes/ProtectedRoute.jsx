import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { useEffect } from "react";

export default function ProtectedRoute({ children }) {
  debugger;
  const navigate = useNavigate();

  useEffect(() => {
    const cookies = Cookies.get();
    if (cookies && !cookies.token) return navigate("/login");
  }, []);
  return children;
}
