import ContactOrganism from "../organisms/ContactOrganism";
import ContactTemplate from "../templates/ContactTemplate";
import authController from "../../controllers/authController";
import contactController from "../../controllers/contactController";
import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { useGlobal } from "../../context/GlobalContext";

export default function ContactPage() {
  const { setInitialState, dataUser, listItemsContacts } = useGlobal();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [sendRequestContact, setSendRequestContact] = useState(false);
  const [payload, setPayload] = useState("");
  const [userFound, setUserFound] = useState("");
  const [contactsList, setContactsList] = useState([]);
  const itemPayloadContact = {
    key: "sendMessege",
  };

  useEffect(() => {
    getAllContacts();
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

  const getAllContacts = async () => {
    const data = await contactController.get.allById(
      localStorage.getItem("idUser")
    );
    // setContactsList(data);

    setInitialState({
      type: "SET_INITIAL_STATE",
      key: "listItemsContacts",
      payload: data,
    });

    setInitialState({
      type: "SET_INITIAL_STATE",
      key: "loading",
      payload: false,
    });
  };

  const openModal = () => {
    setInitialState({
      type: "SET_INITIAL_STATE",
      key: "isModal",
      payload: true,
    });
  };

  const exitApp = async () => {
    await authController.post.logout();
    navigate("/login");
  };

  return (
    <ContactTemplate>
      <ContactOrganism
        itemPayloadContact={itemPayloadContact}
        sendRequestContact={sendRequestContact}
        setPayload={setPayload}
        payload={payload}
        userFound={userFound}
        itemsContact={listItemsContacts}
        onViewConnectedUsers={viewConnectedUsers}
        onSearchContact={searchContact}
        onAddContactList={addContactList}
        onOpenModal={openModal}
        onExitApp={exitApp}
      />
    </ContactTemplate>
  );
}
