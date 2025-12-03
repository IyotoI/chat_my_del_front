import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ChatPage from "../components/pages/ChatPage";
import LoginPage from "../components/pages/LoginPage";

export default function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/chat" element={<ChatPage />} />
      {/* Redirección por defecto */}
    </Routes>
  );
}
