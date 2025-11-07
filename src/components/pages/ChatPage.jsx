import ChatOrganism from "../organisms/ChatOrganism";
import ChatTemplate from "../templates/ChatTemplate";
import { useSocket } from "../../hooks/useSocket";

export default function ChatPage() {
  const socket = useSocket();
  console.log(socket);

  return (
    <ChatTemplate>
      <ChatOrganism />
    </ChatTemplate>
  );
}
