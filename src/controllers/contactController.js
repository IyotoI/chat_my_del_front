const VITE_URL_BACKEND_CHAT = import.meta.env.VITE_URL_BACKEND_CHAT;
// import { useGlobal } from "../context/GlobalContext";

const contactController = {
  post: {
    one: async (payload) => {
      try {
        const res = await fetch(`${VITE_URL_BACKEND_CHAT}/api/contact`, {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        });

        const data = await res.json();

        return data;
      } catch (error) {
        console.error("Message server:", error.message);
      }
    },
  },
};

export default contactController;
