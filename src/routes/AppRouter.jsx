import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ChatPage from "../components/pages/ChatPage";
import LoginPage from "../components/pages/LoginPage";
import RegisterPage from "../components/pages/RegisterPage";
import WelcomePage from "../components/pages/WelcomePage";
import ContactPage from "../components/pages/ContactPage";
import UserConnectedPage from "../components/pages/UserConnectedPage";
import ProtectedRoute from "../routes/ProtectedRoute";

export default function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<WelcomePage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/login" element={<LoginPage />} />

      <Route element={<ProtectedRoute />}>
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/chat" element={<ChatPage />} />
        <Route path="/userConnected" element={<UserConnectedPage />} />
      </Route>
    </Routes>
  );
}
