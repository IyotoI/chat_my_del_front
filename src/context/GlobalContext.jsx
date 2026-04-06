import { createContext, useContext, useReducer, useEffect } from "react";
import { useSocket } from "../hooks/useSocket";
import { appReducer, initialState } from "./appReducer";

const GlobalContext = createContext();

export function GlobalProvider({ children }) {
  const socket = useSocket();

  useEffect(() => {
    if (!socket) return;

    socket.on("chat:idSocket", (idSocket) => {
      const validateIdSoket = localStorage.getItem("idSocket");
      if (!validateIdSoket) {
        localStorage.setItem("idSocket", idSocket);
      }
    });

    return () => {
      socket.off("chat:idSocket");
    };
  }, [socket]);

  const [state, dispatch] = useReducer(appReducer, initialState);

  const setInitialState = (value) => dispatch(value);

  return (
    <GlobalContext.Provider value={{ ...state, socket, setInitialState }}>
      {children}
    </GlobalContext.Provider>
  );
}

export function useGlobal() {
  return useContext(GlobalContext);
}
