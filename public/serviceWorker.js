self.addEventListener("push", (e) => {
  const data = e.data.json();
  console.log("🚀 ~ data:", data);
  self.registration.showNotification(data.title, {
    body: data.message,
    icon: "",
  });
});
