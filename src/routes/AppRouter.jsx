import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ChatPage from "../components/pages/ChatPage";
import LoginPage from "../components/pages/LoginPage";
import ProtectedRoute from "../routes/ProtectedRoute";

export default function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="*" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<LoginPage />} />
      <Route
        path="/chat"
        element={
          <ProtectedRoute>
            <ChatPage />
          </ProtectedRoute>
        }
      />
      {/* Opcional: ruta 404 */}
    </Routes>
  );
}
