const VITE_URL_BACKEND_CHAT = import.meta.env.VITE_URL_BACKEND_CHAT;
const path = "messages";

const messagesApi = {
  get: async () => {
    const res = await fetch(`${VITE_URL_BACKEND_CHAT}/api/${path}`, {
      method: "GET",
      credentials: "include",
    });

    const data = res.json();
    return data;
  },
  post: async (payload) => {
    const res = await fetch(`${VITE_URL_BACKEND_CHAT}/api/${path}`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const data = res.json();
    return data;
  },
  put: async (payload) => {
    const res = await fetch(
      `${VITE_URL_BACKEND_CHAT}/api/${path}/${payload.id}`,
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
  },
  delete: async (payload) => {
    const res = await fetch(
      `${VITE_URL_BACKEND_CHAT}/api/${path}/${payload.id}`,
      {
        method: "DELETE",
        credentials: "include",
      }
    );

    const data = res.json();
    return data;
  },
};

export default messagesApi;
