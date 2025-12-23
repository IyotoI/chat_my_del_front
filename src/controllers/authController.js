import { mdiLogout } from "@mdi/js";

const VITE_URL_BACKEND_CHAT = import.meta.env.VITE_URL_BACKEND_CHAT;
// import { useGlobal } from "../context/GlobalContext";

const authController = {
  post: {
    login: async (payload) => {
      try {
        const res = await fetch(`${VITE_URL_BACKEND_CHAT}/api/auth/login`, {
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
    register: async (payload) => {
      try {
        const res = await fetch(`${VITE_URL_BACKEND_CHAT}/api/auth/register`, {
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
    logout: async (payload) => {
      try {
        const res = await fetch(`${VITE_URL_BACKEND_CHAT}/api/auth/logout`, {
          method: "POST",
          credentials: "include",
        });

        const data = await res.json();

        return data;
      } catch (error) {
        console.error("Message server:", error.message);
      }
    },
  },
  get: {
    userConnected: async () => {
      try {
        const res = await fetch(`${VITE_URL_BACKEND_CHAT}/api/user/connected`, {
          method: "GET",
          credentials: "include",
        });
        const data = await res.json();

        return data;
      } catch (error) {
        console.error("Message server:", error.message);
      }
    },
    userIdConnected: async (id) => {
      // const { setInitialState } = useGlobal();
      // setInitialState({
      //   type: "SET_INITIAL_STATE",
      //   key: "loading",
      //   payload: true,
      // });

      try {
        const res = await fetch(
          `${VITE_URL_BACKEND_CHAT}/api/user/connected/${id}`,
          {
            method: "GET",
            credentials: "include",
          }
        );
        const data = await res.json();
        console.log("🚀 ~ data:", data);

        return data;
      } catch (error) {
        console.error("Message server:", error.message);
      }

      // setInitialState({
      //   type: "SET_INITIAL_STATE",
      //   key: "loading",
      //   payload: false,
      // });
    },
  },
};
console.log("🚀 ~ authController.post.login:", authController.post.login);

export default authController;
