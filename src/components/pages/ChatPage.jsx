import ChatOrganism from "../organisms/ChatOrganism";
import ChatTemplate from "../templates/ChatTemplate";
import { useEffect, useState, useRef, useLayoutEffect } from "react";
import { useGlobal } from "../../context/GlobalContext";
import { useNavigate } from "react-router-dom";
import roomsApi from "../../api/rooms";
import messagesApi from "../../api/messages";
import { useLocation } from "react-router-dom";

export default function ChatPage() {
  const { socket, setIsOpen } = useGlobal();
  const [isFieldWriting, setIsFieldWriting] = useState(false);
  const [idRoomChat, setIdRoomChat] = useState("");
  const [fieldChat, setFieldChat] = useState("");
  const [conversation, setConversation] = useState([]);
  const [contactSelected, setContactSelected] = useState("Amigo");
  const documentoRef = useRef(null);
  const refListChats = useRef(null);
  const [messagesChat, setMessagesChat] = useState([]);
  const navigate = useNavigate();
  const VITE_PUBLIC_VAPID_KEY = import.meta.env.VITE_PUBLIC_VAPID_KEY;
  const VITE_URL_BACKEND_CHAT = import.meta.env.VITE_URL_BACKEND_CHAT;
  const { state } = useLocation();

  const handleSetFieldChat = (value) => {
    setFieldChat(value);
    const keyRoom = localStorage.getItem("keyRoom");
    const idSocket = localStorage.getItem("idSocket");

    socket.emit("chat:fieldWriting", {
      idReceiver: state.idRoomChat,
      message: value,
      idSocket,
    });
  };

  const handleChat = async () => {
    if (fieldChat === "") {
      return;
    }

    console.log(state);

    const idSocket2 = localStorage.getItem("idSocket");
    const keyRoom = localStorage.getItem("keyRoom");

    const { data } = await messagesApi.post({
      message: fieldChat,
      user: localStorage.getItem("idUser"),
    });

    const room = await roomsApi.put({
      conversation: data.id,
      idRoom:  state.idRoomChat,
    });

    // console.log(room)
    // const reg = await navigator.serviceWorker.register("/serviceWorker.js", {
    //   scope: "/",
    // });

    // const sub = await reg.pushManager.subscribe({
    //   userVisibleOnly: true,
    //   applicationServerKey: convertUrlBase64ToUint8Array(VITE_PUBLIC_VAPID_KEY),
    // });

    socket.emit("chat:message", {
      idReceiver: state.idRoomChat,
      message: fieldChat,
      idSocket2,
      subscription: state.subscription,
      user: localStorage.getItem("idUser"),
    });

    // socket.emit("notification", {
    //   subscription: state.subscription,
    //   message: fieldChat,
    // });

    socket.emit("chat:fieldWriting", {
      idReceiver: state.idRoomChat,
      message: "",
      idSocket2,
    });

    setFieldChat("");
    documentoRef.current.focus();
  };

  const exitChat = () => {
    navigate("/login");
    localStorage.removeItem("keyRoom");
  };

  const convertUrlBase64ToUint8Array = (base64String) => {
    const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
    const base64 = (base64String + padding)
      .replace(/-/g, "+")
      .replace(/_/g, "/");

    const rawData = atob(base64);
    return Uint8Array.from([...rawData].map((c) => c.charCodeAt(0)));
  };

  const enableNotifications = async () => {
    const permissionNotificationResponse =
      await Notification.requestPermission();

    if (permissionNotificationResponse !== "granted") {
      alert("Debes permitir las notificaciones");
      return;
    }

    await registerServiceWorker();

    alert("Las notificaciones ya estan activadas");
  };

  const registerServiceWorker = async () => {
    const existsRegisterServiceWorker =
      await navigator.serviceWorker.getRegistration();

    const reg = await navigator.serviceWorker.register("/serviceWorker.js", {
      scope: "/",
    });

    const sub = await reg.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: convertUrlBase64ToUint8Array(VITE_PUBLIC_VAPID_KEY),
    });

    // if (existsRegisterServiceWorker) {
    //   console.log("Ya hay un service worker registrado");
    //   return existsRegisterServiceWorker;
    // }

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

  const goBack = () => {
    navigate("/contact");
  };

  const getRoom = async (participants) => {
    const { data } = await roomsApi.getByParticipants(participants);
    console.log("🚀 ~ getRoom ~ data:", data)
    setConversation(data.conversation);
    setIdRoomChat(data.id);
  };

  useLayoutEffect(() => {
    if (refListChats.current) {
      refListChats.current.scrollTop = refListChats.current.scrollHeight;
    }
  }, [messagesChat]);

  /* Sokets */
  useEffect(() => {

    if (!socket) return;
    setConversation(state.conversation);
    setContactSelected(state.userNameContact);
    getRoom(state.participants);

    socket.on("chat:message", ({ idReceiver, message, idSocket2, user }) => {
      const idSocket3 = localStorage.getItem("idSocket");
      const messageUser = { message, idSocket2, idSocket3, user };
      // setMessagesChat((prev) => [...prev, messageUser]);
      setConversation((prev) => [...prev, messageUser]);
    });

    socket.on("join-room", (value) => {
      // if (value === localStorage.getItem("idSocket")) {
      //   return;
      // }
      // setIsOpen(false);
      // socket.emit("closeModal", {
      //   isOpen: false,
      // });
    });

    socket.on("closeModal", (value) => {
      setIsOpen(false);
    });

    socket.on("chat:fieldWriting", (value) => {
      const idSocket = localStorage.getItem("idSocket");

      if (value.message === "" || value.idSocket === idSocket) {
        setIsFieldWriting(false);
        return;
      }

      setIsFieldWriting(true);
    });

    return () => {
      socket.off("join-room");
      socket.off("chat:message ");
    };
  }, []);

  return (
    <ChatTemplate>
      <ChatOrganism
        isFieldWriting={isFieldWriting}
        handleChat={handleChat}
        fieldChat={fieldChat}
        setFieldChat={handleSetFieldChat}
        ref={documentoRef}
        ref2={refListChats}
        conversation={conversation}
        messagesChat={messagesChat}
        onExitChat={exitChat}
        onGoBack={goBack}
        onEnableNotifications={enableNotifications}
        contactSelected={contactSelected}
      />
    </ChatTemplate>
  );
}
