const VITE_URL_BACKEND_CHAT = import.meta.env.VITE_URL_BACKEND_CHAT;

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
  },
  get: {
    userConnected: async () => {
      try {
        const res = await fetch(`${VITE_URL_BACKEND_CHAT}/api/user/connected`, {
          credentials: "include",
        });
        const data = await res.json();

        return data;
      } catch (error) {
        console.error("Message server:", error.message);
      }
    },
  },
};

export default authController;
