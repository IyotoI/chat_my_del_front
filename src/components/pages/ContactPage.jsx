import ContactOrganism from "../organisms/ContactOrganism";
import ContactTemplate from "../templates/ContactTemplate";
import authController from "../../controllers/authController";
import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { useGlobal } from "../../context/GlobalContext";

export default function ContactPage() {
  const { setInitialState } = useGlobal();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [sendRequestContact, setSendRequestContact] = useState(false);
  const [payload, setPayload] = useState("");
  const [userFound, setUserFound] = useState("");

  useEffect(() => {
    if (pathname === "/contact") {
      setSendRequestContact(true);
    }
  }, []);

  const viewConnectedUsers = () => {
    navigate("/userConnected");
  };

  const searchContact = async () => {
    setInitialState({
      type: "SET_INITIAL_STATE",
      key: "loading",
      payload: true,
    });
    const data = await authController.get.userIdConnected(payload);
    setInitialState({
      type: "SET_INITIAL_STATE",
      key: "loading",
      payload: false,
    });
    setUserFound(data);
  };

  return (
    <ContactTemplate>
      <ContactOrganism
        onViewConnectedUsers={viewConnectedUsers}
        sendRequestContact={sendRequestContact}
        onSearchContact={searchContact}
        setPayload={setPayload}
        payload={payload}
        userFound={userFound}
      />
    </ContactTemplate>
  );
}
