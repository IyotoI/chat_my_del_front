// import { getMessaging, onBackgroundMessage } from "firebase/messaging/sw";
// import { firebaseApp } from "../src/services/firebase/auth";

// const messaging = getMessaging(firebaseApp);

// onBackgroundMessage(messaging, (payload) => {
//   // Customize notification here
//   const notificationTitle = payload.notification.title;
//   const notificationOptions = {
//     body: payload.notification.body,
//     icon: payload.notification.icon,
//   };

//   self.registration.showNotification(notificationTitle, notificationOptions);
// });

// Note that you can only use Firebase Messaging here. Other Firebase libraries
// are not available in the service worker.
// Replace 10.13.2 with latest version of the Firebase JS SDK.
importScripts(
  "https://www.gstatic.com/firebasejs/10.13.2/firebase-app-compat.js",
);
importScripts(
  "https://www.gstatic.com/firebasejs/10.13.2/firebase-messaging-compat.js",
);

// Initialize the Firebase app in the service worker by passing in
// your app's Firebase config object.
// https://firebase.google.com/docs/web/setup#config-object
firebase.initializeApp({
  apiKey: "AIzaSyBjHm3wr75NoVpmr8mFEr_S4kCQ9EFaxHk",
  authDomain: "chatmyd-push-notification.firebaseapp.com",
  projectId: "chatmyd-push-notification",
  storageBucket: "chatmyd-push-notification.firebasestorage.app",
  messagingSenderId: "223753822765",
  appId: "1:223753822765:web:6e34f423eef10358110ea4",
});

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log(
    "[firebase-messaging-sw.js] Received background message ",
    payload,
  );
  // Customize notification here
  const notificationTitle = payload.data.title;
  const notificationOptions = {
    body: payload.data.body,
    icon: payload.data.icon,
    tag: Date.now().toString(), // evita agrupación
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
