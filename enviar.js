// Configura tu Firebase aquí
const firebaseConfig = {
  apiKey: "AIzaSyDlwWegSFH46DgLOYkU0nAIV4boTe5bBM8",
  authDomain: "alertatv-6c92f.firebaseapp.com",
  projectId: "alertatv-6c92f",
  storageBucket: "alertatv-6c92f.firebasestorage.app",
  messagingSenderId: "7708017692",
  appId: "1:7708017692:web:48bb6e7b525f8e23170bd9",
  measurementId: "G-LL3FWNH09M"
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
