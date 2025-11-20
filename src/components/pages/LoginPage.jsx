import { useState } from "react";
import { useNavigate } from "react-router-dom";
import FormLogin from "../molecules/form/FormLogin";
import LoginTemplate from "../templates/LoginTemplate";
import { useGlobal } from "../../context/GlobalContext";

export default function LoginPage() {
  const { socket } = useGlobal();
  const [keyRoom, setKeyRoom] = useState("");
  const navigate = useNavigate();

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
