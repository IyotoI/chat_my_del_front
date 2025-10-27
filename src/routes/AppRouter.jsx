import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ChatPage from "../components/pages/ChatPage";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<h1>Hola</h1>} />
        <Route path="/chat" element={<ChatPage />} />
        {/* Redirección por defecto */}
        {/* <Route path="*" element={<Navigate to="/chat" replace />} /> */}
      </Routes>
    </BrowserRouter>
  );
}
