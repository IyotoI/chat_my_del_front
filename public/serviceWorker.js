self.addEventListener("push", (e) => {
  const data = e.data.json();

  const options = {
    body: data.message,
    data: {
      url: data.url,
    },
  };

  e.waitUntil(self.registration.showNotification(data.title, options));
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();

  const urlToOpen = new URL(event.notification.data.url, self.location.origin)
    .href;

  event.waitUntil(
    clients
      .matchAll({ type: "window", includeUncontrolled: true })
      .then((clientList) => {
        // Si ya hay una pestaña abierta → enfócarla y navegar
        for (const client of clientList) {
          if ("focus" in client) {
            client.focus();
            client.navigate(urlToOpen); // navegar dentro de la app
            return;
          }
        }

        // Si no hay ventana abierta → abrir una nueva
        if (clients.openWindow) {
          return clients.openWindow(urlToOpen);
        }
      })
  );
});
