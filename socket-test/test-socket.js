const { io } = require("socket.io-client");

const socket = io("http://localhost:3000"); // 🔁 Remplace par l'IP backend si besoin

socket.on("connect", () => {
  console.log("✅ Connecté au serveur WebSocket !");
});

socket.on("invoice_alert", (data) => {
  console.log("🛎️ Alerte reçue :", data.message);
  console.log("💡 Détails :", data);
});

socket.on("disconnect", () => {
  console.log("❌ Déconnecté du serveur WebSocket.");
});
