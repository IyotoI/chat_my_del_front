import ContactOrganism from "../organisms/ContactOrganism";
import ContactTemplate from "../templates/ContactTemplate";
import authController from "../../controllers/authController";
import contactController from "../../controllers/contactController";
import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { useGlobal } from "../../context/GlobalContext";
import roomsApi from "../../api/rooms";

export default function ContactPage() {
  const { socket, setInitialState, dataUser, listItemsContacts } = useGlobal();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [sendRequestContact, setSendRequestContact] = useState(false);
  const [payload, setPayload] = useState("");
  const [userFound, setUserFound] = useState("");
  const [contactsList, setContactsList] = useState([]);
  const itemPayloadContact = {
    key: "sendMessege",
  };
  const [conversation, setConversation] = useState([]);
  const [idRoomChat, setIdRoomChat] = useState("");
  const VITE_PUBLIC_VAPID_KEY = import.meta.env.VITE_PUBLIC_VAPID_KEY;
  const VITE_URL_BACKEND_CHAT = import.meta.env.VITE_URL_BACKEND_CHAT;

  useEffect(() => {
    getAllContacts();
    enableNotifications();
  }, []);

  const viewConnectedUsers = () => {
    navigate("/userConnected");
  };

  const searchContact = async () => {
    setInitialState({
      type: "SET_INITIAL_STATE",
      key: "modalGeneral",
      payload: { isOpenModal: true, nameComponentContent: "loader" },
    });
    const data = await authController.get.userIdConnected(payload);
    console.log("🚀 ~ searchContact ~ data:", data);
    // console.log("🚀 ~ searchContact ~ data:", data);
    // setUserFound(data);
    // setInitialState({
    //   type: "SET_INITIAL_STATE",
    //   key: "modalGeneral",
    //   payload: { isOpenModal: false, nameComponentContent: "loader" },
    // });
    // setInitialState({
    //   type: "SET_INITIAL_STATE",
    //   key: "modalGeneral",
    //   payload: { isOpenModal: true, nameComponentContent: "alertCard" },
    // });
  };

  const addContactList = async () => {
    setInitialState({
      type: "SET_INITIAL_STATE",
      key: "modalGeneral",
      payload: { isOpenModal: true, nameComponentContent: "loader" },
    });

    const data = await contactController.post.one({
      ...userFound,
      userIdLogeado: dataUser.id,
    });

    setInitialState({
      type: "SET_INITIAL_STATE",
      key: "modalGeneral",
      payload: { isOpenModal: false, nameComponentContent: "loader" },
    });
    setInitialState({
      type: "SET_INITIAL_STATE",
      key: "modalGeneral",
      payload: { isOpenModal: true, nameComponentContent: "alertCard" },
    });
  };

  const getAllContacts = async () => {
    const data = await contactController.get.allById(
      localStorage.getItem("idUser"),
    );
    setContactsList(data);

    setInitialState({
      type: "SET_INITIAL_STATE",
      key: "listItemsContacts",
      payload: data,
    });

    setInitialState({
      type: "SET_INITIAL_STATE",
      key: "modalGeneral",
      payload: { isOpenModal: false, nameComponentContent: "loader" },
    });
  };

  const getRoom = async (participants) => {
    setInitialState({
      type: "SET_INITIAL_STATE",
      key: "modalGeneral",
      payload: { isOpenModal: true, nameComponentContent: "loader" },
    });
    const { data } = await roomsApi.getByParticipants(participants);
    setConversation(data.conversation);
    setInitialState({
      type: "SET_INITIAL_STATE",
      key: "modalGeneral",
      payload: { isOpenModal: false, nameComponentContent: "loader" },
    });

    return data;
  };

  const createRoom = async (participants) => {
    setInitialState({
      type: "SET_INITIAL_STATE",
      key: "modalGeneral",
      payload: { isOpenModal: true, nameComponentContent: "loader" },
    });

    const { data } = await roomsApi.post({ participants, conversation: [] });

    setConversation(data.conversation);
    setInitialState({
      type: "SET_INITIAL_STATE",
      key: "modalGeneral",
      payload: { isOpenModal: false, nameComponentContent: "loader" },
    });

    return data;
  };

  const actionButtonItem = async (...data) => {
    // return
    verify();
    const idUserReceptor = data[1].contact._id;
    const idUserEmisor = localStorage.getItem("idUser");
    const participants = idUserEmisor + "," + idUserReceptor;

    try {
      const { id, conversation } = await getRoom(participants);
      socket.emit("join-room", {
        idsoketUser: idUserEmisor,
        IdSocketReceiver: id,
      });
      console.log("🚀 ~ actionButtonItem ~ data:", data)

      navigate("/chat", {
        state: {
          participants,
          conversation,
          idRoomChat: id,
          subscription: data[1].contact.subscription,
          userNameContact: data[1].contact.userName,
        },
      });
    } catch (error) {
      const { id, conversation } = await createRoom(participants);
      socket.emit("join-room", {
        idsoketUser: idUserEmisor,
        IdSocketReceiver: id,
      });
      navigate("/chat", {
        state: {
          participants,
          conversation,
          idRoomChat: id,
          subscription: data[1].contact.subscription,
          userNameContact: data[1].contact.userName,
        },
      });
    }
  };

  const convertUrlBase64ToUint8Array = (base64String) => {
    const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
    const base64 = (base64String + padding)
      .replace(/-/g, "+")
      .replace(/_/g, "/");

    const rawData = atob(base64);
    return Uint8Array.from([...rawData].map((c) => c.charCodeAt(0)));
  };

  const verify = async () => {
    const existsRegisterServiceWorker =
      await navigator.serviceWorker.getRegistration();
    console.log(
      "🚀 ~ verify ~ existsRegisterServiceWorker:",
      existsRegisterServiceWorker,
    );

    // if (existsRegisterServiceWorker) {
    //   console.log("Ya hay un service worker registrado");
    //   return existsRegisterServiceWorker;
    // }
  };

  const registerServiceWorker = async () => {
    // await verify();

    const reg = await navigator.serviceWorker.register("/serviceWorker.js", {
      scope: "/",
    });

    const subscription = await reg.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: convertUrlBase64ToUint8Array(VITE_PUBLIC_VAPID_KEY),
    });

    // const data = {
    //   subscription,
    //   idUser: localStorage.getItem("idUser"),
    // };

    // socket.emit("notification", data);

    const res = await fetch(
      `${VITE_URL_BACKEND_CHAT}/api/auth/login/${localStorage.getItem("idUser")}`,
      {
        method: "PUT",
        body: JSON.stringify({
          subscription: subscription,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
    console.log("🚀 ~ registerServiceWorker ~ res:", res);

    // console.log("🚀 ~ registerServiceWorker ~ sub:", sub);

    // await fetch(`${VITE_URL_BACKEND_CHAT}/suscription`, {
    //   method: "POST",
    //   body: JSON.stringify({
    //     idSocket: localStorage.getItem("idSocket"),
    //     subscription: sub,
    //   }),
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    // });
  };

  const enableNotifications = async () => {
    const permissionNotificationResponse =
      await Notification.requestPermission();

    if (permissionNotificationResponse !== "granted") {
      alert("Debes permitir las notificaciones");
      return;
    }

    await registerServiceWorker();

    // alert("Las notificaciones ya estan activadas");
  };

  const openModal = () => {
    setInitialState({
      type: "SET_INITIAL_STATE",
      key: "modalGeneral",
      payload: { isOpenModal: true, nameComponentContent: "formContact" },
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
        onActionButtonItem={actionButtonItem}
        onEnableNotifications={enableNotifications}
      />
    </ContactTemplate>
  );
}
