import ContactOrganism from "../organisms/ContactOrganism";
import ContactTemplate from "../templates/ContactTemplate";
import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

export default function ContactPage() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [sendRequestContact, setSendRequestContact] = useState(false);

  useEffect(() => {
    if (pathname === "/contact") {
      setSendRequestContact(true);
    }
  }, []);

  const viewConnectedUsers = () => {
    navigate("/userConnected");
  };
  return (
    <ContactTemplate>
      <ContactOrganism
        onViewConnectedUsers={viewConnectedUsers}
        sendRequestContact={sendRequestContact}
      />
    </ContactTemplate>
  );
}
