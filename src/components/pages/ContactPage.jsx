import ContactOrganism from "../organisms/ContactOrganism";
import ContactTemplate from "../templates/ContactTemplate";
import { useNavigate } from "react-router-dom";

export default function ContactPage() {
  const navigate = useNavigate();

  const viewConnectedUsers = () => {
    navigate("/userConnected");
  };
  return (
    <ContactTemplate>
      <ContactOrganism onViewConnectedUsers={viewConnectedUsers} />
    </ContactTemplate>
  );
}
