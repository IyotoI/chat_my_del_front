import ChatOrganism from "../organisms/ChatOrganism";
import ChatTemplate from "../templates/ChatTemplate";
import { useSocket } from "../../hooks/useSocket";
import { useEffect, useState } from "react";

export default function ChatPage() {
  const socket = useSocket();
  const [isFieldWriting, setIsFieldWriting] = useState(false);
  const [fieldChat, setFieldChat] = useState("");

  // const fieldChatEmitSokect = (value) => {
  //   const idSocket = localStorage.getItem("idSocket");

  //   socket.emit("chat:fieldWriting", {
  //     // idReceiver: idSocketReceiver.textContent,
  //     message: value,
  //     idSocket,
  //   });
  // };

  const handleChat = () => {
    console.log(fieldChat);
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
      />
    </ChatTemplate>
  );
}
