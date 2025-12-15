import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ChatPage from "../components/pages/ChatPage";
import LoginPage from "../components/pages/LoginPage";
import RegisterPage from "../components/pages/RegisterPage";
import WelcomePage from "../components/pages/WelcomePage";
import ContactPage from "../components/pages/ContactPage";
import ProtectedRoute from "../routes/ProtectedRoute";

export default function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<WelcomePage />} />
      {/* <Route path="*" element={<Navigate to="/login" replace />} /> */}
      <Route path="/login" element={<LoginPage />} />
      <Route
        path="/chat"
        element={
          <ProtectedRoute>
            <ChatPage />
          </ProtectedRoute>
        }
      />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/contact" element={<ContactPage />} />
      {/* Opcional: ruta 404 */}
    </Routes>
  );
}
