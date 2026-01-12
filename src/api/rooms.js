const VITE_URL_BACKEND_CHAT = import.meta.env.VITE_URL_BACKEND_CHAT;
const path = "rooms";

const roomsApi = {
  getByParticipants: async (participants) => {
    const res = await fetch(
      `${VITE_URL_BACKEND_CHAT}/api/${path}/${participants}`,
      {
        method: "GET",
        credentials: "include",
      }
    );

    const data = res.json();
    return data;
  },
  put: async (payload) => {
    try {
      const res = await fetch(
        `${VITE_URL_BACKEND_CHAT}/api/${path}/${payload.idRoom}`,
        {
          method: "PUT",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      const data = res.json();
      return data;
    } catch (error) {
      console.log(error.messages);
    }
  },
};

export default roomsApi;
