import {
  requestPermissionAndToken,
  onMessageListener,
} from "../services/firebase/messaging";
const VITE_URL_BACKEND_CHAT = import.meta.env.VITE_URL_BACKEND_CHAT;

export const useMessaging = () => {
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
    }

    onMessageListener((payload) => {
      console.log("Mensaje recibido:", payload);
    });
  };

  return { requestPermission };
};
