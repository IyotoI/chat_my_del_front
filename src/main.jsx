// import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { GlobalProvider } from "./context/GlobalContext.jsx";

window.addEventListener("beforeunload", () =>
  localStorage.removeItem("keyRoom")
);

createRoot(document.getElementById("root")).render(
  <GlobalProvider>
    <App />
  </GlobalProvider>
);
