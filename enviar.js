// Configura tu Firebase aquí
const firebaseConfig = {
  apiKey: "TU_API_KEY",
  authDomain: "TU_PROYECTO.firebaseapp.com",
  databaseURL: "https://TU_PROYECTO.firebaseio.com",
  projectId: "TU_PROYECTO",
  storageBucket: "TU_PROYECTO.appspot.com",
  messagingSenderId: "TU_ID",
  appId: "TU_APP_ID"
};

// Inicializa Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.database();
const ref = db.ref("mensaje");

document.addEventListener("DOMContentLoaded", () => {
  const formulario = document.getElementById("formulario");
  const campoMensaje = document.getElementById("campoMensaje");

  formulario.addEventListener("submit", async (e) => {
    e.preventDefault();
    const texto = campoMensaje.value;

    try {
      // Lee el último ID actual
      const snapshot = await ref.get();
      let nuevoId = 1;
      if (snapshot.exists()) {
        const data = snapshot.val();
        nuevoId = (data.id || 0) + 1;
      }

      // Envía el mensaje
      await ref.set({
        texto,
        id: nuevoId
      });

      alert("Mensaje enviado correctamente.");
      campoMensaje.value = "";
    } catch (error) {
      console.error("Error al enviar mensaje:", error);
      alert("Hubo un error al enviar el mensaje.");
    }
  });
});
