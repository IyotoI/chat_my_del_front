import { useState } from "react";
import { useNavigate } from "react-router-dom";
import FormLogin from "../molecules/form/FormLogin";
import LoginTemplate from "../templates/LoginTemplate";

export default function LoginPage() {
  const [keyRoom, setKeyRoom] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    localStorage.setItem("keyRoom", keyRoom);
    navigate("/chat");
  };

  return (
    <LoginTemplate>
      <FormLogin
        handleLogin={handleLogin}
        keyRoom={keyRoom}
        setKeyRoom={setKeyRoom}
      />
    </LoginTemplate>
  );
}
