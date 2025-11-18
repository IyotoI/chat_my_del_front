import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSocket } from "../../hooks/useSocket";
import FormLogin from "../molecules/form/FormLogin";
import LoginTemplate from "../templates/LoginTemplate";

export default function LoginPage() {
  const [keyRoom, setKeyRoom] = useState("");
  const navigate = useNavigate();
  const socket = useSocket();

  const handleLogin = () => {
    if (keyRoom === "") {
      alert("Ingresar clave de la sala");
      return;
    }

    socket.emit("join-room", {
      idsoketUser: "User",
      IdSocketReceiver: keyRoom,
    });

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
