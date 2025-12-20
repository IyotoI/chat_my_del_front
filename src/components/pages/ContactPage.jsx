import ContactOrganism from "../organisms/ContactOrganism";
import ContactTemplate from "../templates/ContactTemplate";
import authController from "../../controllers/authController";
import contactController from "../../controllers/contactController";
import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { useGlobal } from "../../context/GlobalContext";

export default function ContactPage() {
  const { setInitialState, dataUser } = useGlobal();
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
    setUserFound(data);
    alert("Amigo encontrado");
    setInitialState({
      type: "SET_INITIAL_STATE",
      key: "loading",
      payload: false,
    });
  };

  const addContactList = async () => {
    setInitialState({
      type: "SET_INITIAL_STATE",
      key: "loading",
      payload: true,
    });

    const data = await contactController.post.one({
      ...userFound,
      userIdLogeado: dataUser.id,
    });
    alert("Amigo agregado");

    setInitialState({
      type: "SET_INITIAL_STATE",
      key: "loading",
      payload: false,
    });
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
        onAddContactList={addContactList}
      />
    </ContactTemplate>
  );
}
