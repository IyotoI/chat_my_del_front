import { createContext, useContext, useReducer } from "react";
import { useSocket } from "../hooks/useSocket";
import { appReducer, initialState } from "./appReducer";

const GlobalContext = createContext();

export function GlobalProvider({ children }) {
  const socket = useSocket();

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
