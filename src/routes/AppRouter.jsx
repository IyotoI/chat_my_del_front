import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import ChatPage from "../components/pages/ChatPage";

export default function AppRouter() {
  return (
    <Router>
      <Routes>
        <Route path="/chat" element={<ChatPage />} />
        {/* Redirección por defecto */}
        {/* <Route path="*" element={<Navigate to="/login" replace />} /> */}
      </Routes>
    </Router>
  );
}
