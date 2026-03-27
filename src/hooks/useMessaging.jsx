import {
  requestPermissionAndToken,
  onMessageListener,
} from "../services/firebase/messaging";
import { useGlobal } from "../context/GlobalContext";

export const useMessaging = () => {
  const VITE_URL_BACKEND_CHAT = import.meta.env.VITE_URL_BACKEND_CHAT;
  const { socket, setInitialState, dataUser, listItemsContacts } = useGlobal();

  const requestPermission = async () => {
    const token = await requestPermissionAndToken();
    if (token) {
      await fetch(
        `${VITE_URL_BACKEND_CHAT}/api/auth/login/${localStorage.getItem("idUser")}`,
        {
          method: "PUT",
          body: JSON.stringify({
            subscription: token,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        },
      );
      setInitialState({
        type: "SET_INITIAL_STATE",
        key: "modalGeneral",
        payload: {
          isOpenModal: true,
          nameComponentContent: "alertCard",
          payload: {
            title: "Perfecto",
            description: "Las notificaciones estan activas",
            type: "success",
          },
        },
      });
    }

    onMessageListener((payload) => {
      console.log("Mensaje recibido:", payload);
    });
  };

  return { requestPermission };
};
