import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyBjHm3wr75NoVpmr8mFEr_S4kCQ9EFaxHk",
  authDomain: "chatmyd-push-notification.firebaseapp.com",
  projectId: "chatmyd-push-notification",
  storageBucket: "chatmyd-push-notification.firebasestorage.app",
  messagingSenderId: "223753822765",
  appId: "1:223753822765:web:6e34f423eef10358110ea4",
};

export const firebaseApp = initializeApp(firebaseConfig);
