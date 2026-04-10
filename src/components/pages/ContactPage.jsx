import ContactOrganism from "../organisms/ContactOrganism";
import ContactTemplate from "../templates/ContactTemplate";
import authController from "../../controllers/authController";
import contactController from "../../controllers/contactController";
import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { useGlobal } from "../../context/GlobalContext";
import roomsApi from "../../api/rooms";
import { useMessaging } from "../../hooks/useMessaging";

export default function ContactPage() {
  const { socket, setInitialState, dataUser, listItemsContacts } = useGlobal();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [sendRequestContact, setSendRequestContact] = useState(false);
  const [payload, setPayload] = useState("");
  const [userFound, setUserFound] = useState("");
  const [contactsList, setContactsList] = useState([]);
  const [userProfile, setUserProfile] = useState({});
  const { requestPermission } = useMessaging();
  const itemPayloadContact = {
    key: "sendMessege",
  };
  const [conversation, setConversation] = useState([]);
  const [idRoomChat, setIdRoomChat] = useState("");
  const VITE_PUBLIC_VAPID_KEY = import.meta.env.VITE_PUBLIC_VAPID_KEY;
  const VITE_URL_BACKEND_CHAT = import.meta.env.VITE_URL_BACKEND_CHAT;

  // useMessaging();

  useEffect(() => {
    if (!socket) return;

    getAllContacts();
    // enableNotifications();
    socket.on("backend:notification-last-message", (data) => {
      const arr = listItemsContacts.map((itemContact) => {
        return itemContact.contact._id === data.idContact
          ? itemContact
          : { ...itemContact, lastMessage: data.message };
      });

      setInitialState({
        type: "SET_INITIAL_STATE",
        key: "listItemsContacts",
        payload: arr,
      });
    });

    return () => {
      socket.off("backend:notification-last-message");
    };
  }, [socket]);

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
    if (data[2]) {
      setInitialState({
        type: "SET_INITIAL_STATE",
        key: "modalGeneral",
        payload: {
          isOpenModal: true,
          nameComponentContent: "cardProfile",
          userSelected: {
            name: data[1].contact.userName,
            email: data[1].contact.email,
          },
        },
      });
      return;
    }
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

      navigate("/chat", {
        state: {
          participants,
          conversation,
          idRoomChat: id,
          subscription: data[1].contact.subscription,
          userNameContact: data[1].contact.userName,
          idSocket: localStorage.getItem("idSocket"),
          userNameContact: data[1].contact.userName,
          idContact: data[1].contact._id,
        },
      });

      socket.emit("frontend:last-message-sent", {
        idReceiver: id,
        // message: fieldChat,
        // idSocket2,
        // subscription: state.subscription,
        // user: localStorage.getItem("idUser"),
        // time: data.createdAt,
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

  const enableNotifications = () => {
    requestPermission();
    // useMessaging();
    // const permissionNotificationResponse =
    //   await Notification.requestPermission();
    // if (permissionNotificationResponse !== "granted") {
    //   alert("Debes permitir las notificaciones");
    //   return;
    // }
    // await registerServiceWorker();
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

  const viewProfile = () => {
    const userData = JSON.parse(localStorage.getItem("userData"));
    const email = userData.email;
    const userName = userData.userName;
    setUserProfile({
      email,
      userName,
    });
  };

  const closeWindowProfile = () => {
    setUserProfile({
      email: "",
      userName: "",
    });
  };

  return (
    <ContactTemplate>
      <ContactOrganism
        userProfile={userProfile}
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
        onViewProfile={viewProfile}
        onCloseWindowProfile={closeWindowProfile}
      />
    </ContactTemplate>
  );
}
