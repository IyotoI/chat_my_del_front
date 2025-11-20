import { createContext, useContext, useState, useEffect } from "react";
import { useSocket } from "../hooks/useSocket";

const GlobalContext = createContext();

export function GlobalProvider({ children }) {
  const socket = useSocket();

  return (
    <GlobalContext.Provider value={{ socket }}>
      {children}
    </GlobalContext.Provider>
  );
}

export function useGlobal() {
  return useContext(GlobalContext);
}
