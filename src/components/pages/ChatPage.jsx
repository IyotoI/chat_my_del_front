import ChatOrganism from "../organisms/ChatOrganism";
import ChatTemplate from "../templates/ChatTemplate";
import { useEffect, useState, useRef, useLayoutEffect } from "react";
import { useGlobal } from "../../context/GlobalContext";
import { useNavigate } from "react-router-dom";

export default function ChatPage() {
  const { socket, setIsOpen } = useGlobal();
  const [isFieldWriting, setIsFieldWriting] = useState(false);
  const [fieldChat, setFieldChat] = useState("");
  const documentoRef = useRef(null);
  const refListChats = useRef(null);
  const [messagesChat, setMessagesChat] = useState([]);
  const navigate = useNavigate();

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

  const exitChat = () => {
    navigate("/login");
    localStorage.removeItem("keyRoom");
  };

  useLayoutEffect(() => {
    if (refListChats.current) {
      refListChats.current.scrollTop = refListChats.current.scrollHeight;
    }
  }, [messagesChat]);

  /* Sokets */
  useEffect(() => {
    // refListChats.current.scrollTop = refListChats.current.scrollHeight;

    if (!socket) return;

    socket.on("chat:message", ({ idReceiver, message, idSocket2 }) => {
      const idSocket3 = localStorage.getItem("idSocket");
      const messageUser = { message, idSocket2, idSocket3 };
      setMessagesChat((prev) => [...prev, messageUser]);
    });

    socket.on("join-room", (value) => {
      if (value === localStorage.getItem("idSocket")) {
        return;
      }
      setIsOpen(false);

      socket.emit("closeModal", {
        isOpen: false,
      });
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
        messagesChat={messagesChat}
        onExitChat={exitChat}
      />
    </ChatTemplate>
  );
}
