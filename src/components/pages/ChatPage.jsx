import ChatOrganism from "../organisms/ChatOrganism";
import ChatTemplate from "../templates/ChatTemplate";
import { useEffect, useState, useRef } from "react";
import { useGlobal } from "../../context/GlobalContext";

export default function ChatPage() {
  const { socket } = useGlobal();
  const [isFieldWriting, setIsFieldWriting] = useState(false);
  const [fieldChat, setFieldChat] = useState("");
  const documentoRef = useRef(null);

  // const fieldChatEmitSokect = (value) => {
  //   const idSocket = localStorage.getItem("idSocket");

  //   socket.emit("chat:fieldWriting", {
  //     // idReceiver: idSocketReceiver.textContent,
  //     message: value,
  //     idSocket,
  //   });
  // };

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

    setFieldChat("");
    documentoRef.current.focus();
  };

  /* Sokets */
  useEffect(() => {
    if (!socket) return;

    socket.on("chat:idSocket", (idSocket) => {
      const validateIdSoket = localStorage.getItem("idSocket");
      if (!validateIdSoket) {
        localStorage.setItem("idSocket", idSocket);
      }
    });

    socket.on("chat:message", (value) => {
      console.log("🚀 ~ ChatPage ~ value:", value);
    });

    socket.on("join-room", (value) => {
      console.log("🚀 ~ ChatPage ~ value:", value);
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
      socket.off("chat:idSocket");
    };
  }, [socket]);

  return (
    <ChatTemplate>
      <ChatOrganism
        isFieldWriting={isFieldWriting}
        handleChat={handleChat}
        fieldChat={fieldChat}
        setFieldChat={setFieldChat}
        ref={documentoRef}
      />
    </ChatTemplate>
  );
}
