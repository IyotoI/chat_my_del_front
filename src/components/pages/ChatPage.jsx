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

  /* Sokets */
  useEffect(() => {
    if (!socket) return;

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

    // return () => {
    //   socket.off("chat:idSocket");
    // };
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
