import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import FormLogin from "../molecules/form/FormLogin";
import LoginTemplate from "../templates/LoginTemplate";
import { useGlobal } from "../../context/GlobalContext";

export default function LoginPage() {
  const { socket, setIsOpen } = useGlobal();
  const [keyRoom, setKeyRoom] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (!socket) return;

    socket.on("chat:idSocket", (idSocket) => {
      const validateIdSoket = localStorage.getItem("idSocket");
      if (!validateIdSoket) {
        localStorage.setItem("idSocket", idSocket);
      }
    });

    return () => {
      socket.off("chat:idSocket");
    };
  }, [socket]);

  const handleLogin = () => {
    if (keyRoom === "") {
      alert("Ingresar clave de la sala");
      return;
    }
    setIsOpen(true);

    socket.emit("join-room", {
      idsoketUser: localStorage.getItem("idSocket"),
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
