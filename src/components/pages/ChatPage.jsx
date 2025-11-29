import ChatOrganism from "../organisms/ChatOrganism";
import ChatTemplate from "../templates/ChatTemplate";
import { useEffect, useState, useRef } from "react";
import { useGlobal } from "../../context/GlobalContext";

export default function ChatPage() {
  const { socket } = useGlobal();
  const [isFieldWriting, setIsFieldWriting] = useState(false);
  const [fieldChat, setFieldChat] = useState("");
  const documentoRef = useRef(null);
  const [messagesChat, setMessagesChat] = useState([]);
  const VITE_PUBLIC_VAPID_KEY = import.meta.env.VITE_PUBLIC_VAPID_KEY;
  const VITE_URL_BACKEND_CHAT = import.meta.env.VITE_URL_BACKEND_CHAT;
  // const PRIVATE_VAPID_KEY = process.env.PRIVATE_VAPID_KEY;

  const handleSetFieldChat = (value) => {
    setFieldChat(value);
    const keyRoom = localStorage.getItem("keyRoom");
    const idSocket = localStorage.getItem("idSocket");

    socket.emit("chat:fieldWriting", {
      idReceiver: keyRoom,
      message: value,
      idSocket,
    });
  };

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

  const handleChat = () => {
    if (fieldChat === "") {
      return;
    }

    const idSocket2 = localStorage.getItem("idSocket");
    const keyRoom = localStorage.getItem("keyRoom");

    socket.emit("chat:message", {
      idReceiver: keyRoom,
      message: fieldChat,
      idSocket2,
    });

    socket.emit("chat:fieldWriting", {
      idReceiver: keyRoom,
      message: "",
      idSocket2,
    });

    setFieldChat("");
    documentoRef.current.focus();
  };

  /* Sokets */
  useEffect(() => {
    if (!socket) return;
    registerServiceWorker();

    socket.on("chat:idSocket", (idSocket) => {
      const validateIdSoket = localStorage.getItem("idSocket");
      if (!validateIdSoket) {
        localStorage.setItem("idSocket", idSocket);
      }
    });

    socket.on("chat:message", ({ idReceiver, message, idSocket2 }) => {
      const idSocket3 = localStorage.getItem("idSocket");
      const messageUser = { message, idSocket2, idSocket3 };
      setMessagesChat((prev) => [...prev, messageUser]);
    });

    socket.on("join-room", (value) => {});

    socket.on("chat:fieldWriting", (value) => {
      const idSocket = localStorage.getItem("idSocket");

      if (value.message === "" || value.idSocket === idSocket) {
        setIsFieldWriting(false);
        return;
      }

      setIsFieldWriting(true);
    });

    return () => {
      socket.off("chat:idSocket");
    };
  }, [socket]);

  return (
    <ChatTemplate>
      <ChatOrganism
        isFieldWriting={isFieldWriting}
        handleChat={handleChat}
        fieldChat={fieldChat}
        setFieldChat={handleSetFieldChat}
        ref={documentoRef}
        messagesChat={messagesChat}
      />
    </ChatTemplate>
  );
}
