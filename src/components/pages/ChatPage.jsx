import ChatOrganism from "../organisms/ChatOrganism";
import ChatTemplate from "../templates/ChatTemplate";
import { useSocket } from "../../hooks/useSocket";
import { useEffect } from "react";

export default function ChatPage() {
  const socket = useSocket();
  console.log(socket);

  useEffect(() => {
    if (!socket) return;

    socket.on("chat:idSocket", (idSocket) => {
      console.log("🚀 ~ ChatPage ~ idSocket:", idSocket);
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
  }, []);

  return (
    <ChatTemplate>
      <ChatOrganism />
    </ChatTemplate>
  );
}
