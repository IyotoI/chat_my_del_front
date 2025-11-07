import ChatOrganism from "../organisms/ChatOrganism";
import ChatTemplate from "../templates/ChatTemplate";
import { useSocket } from "../../hooks/useSocket";
import { useEffect } from "react";

export default function ChatPage() {
  const socket = useSocket();

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
      console.log("🚀 ~ ChatPage ~ value:", value);
    });

    return () => {
      socket.off("chat:idSocket");
    };
  }, [socket]);

  return (
    <ChatTemplate>
      <ChatOrganism />
    </ChatTemplate>
  );
}
