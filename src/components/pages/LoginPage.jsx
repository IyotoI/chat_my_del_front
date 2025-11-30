import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import FormLogin from "../molecules/form/FormLogin";
import LoginTemplate from "../templates/LoginTemplate";
import { useGlobal } from "../../context/GlobalContext";

export default function LoginPage() {
  const { socket, setIsOpen } = useGlobal();
  const [keyRoom, setKeyRoom] = useState("");
  const navigate = useNavigate();
  const VITE_PUBLIC_VAPID_KEY = import.meta.env.VITE_PUBLIC_VAPID_KEY;
  const VITE_URL_BACKEND_CHAT = import.meta.env.VITE_URL_BACKEND_CHAT;

  useEffect(() => {
    if (!socket) return;
    registerServiceWorker();

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

  const urlBase64ToUint8Array = (base64String) => {
    const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
    const base64 = (base64String + padding)
      .replace(/-/g, "+")
      .replace(/_/g, "/");

    const rawData = atob(base64);
    return Uint8Array.from([...rawData].map((c) => c.charCodeAt(0)));
  };

  const registerServiceWorker = async () => {
    const permiso = await Notification.requestPermission();
    if (permiso !== "granted") {
      alert("Debes permitir notificaciones");
      return;
    }

    const reg = await navigator.serviceWorker.register("/serviceWorker.js", {
      scope: "/",
    });

    const sub = await reg.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: urlBase64ToUint8Array(VITE_PUBLIC_VAPID_KEY),
    });

    await fetch(`${VITE_URL_BACKEND_CHAT}/suscription`, {
      method: "POST",
      body: JSON.stringify({
        idSocket: localStorage.getItem("idSocket"),
        subscription: sub,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
  };

  const handleLogin = () => {
    // return;
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
