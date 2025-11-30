import { createContext, useContext, useState, useEffect } from "react";
import { useSocket } from "../hooks/useSocket";

const GlobalContext = createContext();

export function GlobalProvider({ children }) {
  const socket = useSocket();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <GlobalContext.Provider value={{ socket, isOpen, setIsOpen }}>
      {children}
    </GlobalContext.Provider>
  );
}

export function useGlobal() {
  return useContext(GlobalContext);
}
