import { getMessaging, getToken, onMessage } from "firebase/messaging";
import { firebaseApp } from "../../services/firebase/auth";

const messaging = getMessaging(firebaseApp);

export const requestPermissionAndToken = async () => {
  const permission = await Notification.requestPermission();

  if (permission !== "granted") {
    alert("Debes permitir las notificaciones");
    return null;
  }

  const token = await getToken(messaging, {
    vapidKey:
      "BHTF5PurTHuZvLnVaorAPhw3qSZcip5FxjLLyrHiXEfX7ovJw1fMDQCeXb7lCU1yTkL2xw_VTLDSkFWKWWLWpeE",
  });

  return token;
};

export const onMessageListener = (callback) => {
  onMessage(messaging, (payload) => {
    callback(payload);
  });
};
