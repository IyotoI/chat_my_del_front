import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import FormRegister from "../molecules/form/FormRegister";
import RegisterTemplate from "../templates/RegisterTemplate";
import { useGlobal } from "../../context/GlobalContext";

export default function RegisterPage() {
  const { socket, setIsOpen } = useGlobal();
  const [keyRoom, setKeyRoom] = useState("");
  const [payload, setPayload] = useState({
    userName: "",
    email: "",
    password: "",
  });

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

  const handleLogin = (e) => {
    e.preventDefault();
    console.log(payload);
    return;
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
    <RegisterTemplate>
      <FormRegister
        handleLogin={handleLogin}
        payload={payload}
        setPayload={setPayload}
      />
    </RegisterTemplate>
  );
}
