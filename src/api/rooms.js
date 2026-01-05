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
};

export default roomsApi;
