import { Navigate } from "react-router-dom";
import { useGlobal } from "../../src/context/GlobalContext";

export default function ProtectedRoute({ children }) {
  const { dataUser } = useGlobal();
  if (dataUser && !dataUser.id) return <Navigate to="/login" />;
  return children;
}
