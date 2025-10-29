import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ChatPage from "../components/pages/ChatPage";
import LoginPage from "../components/pages/LoginPage";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/chat" element={<ChatPage />} />
        {/* Redirección por defecto */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
