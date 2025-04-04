import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js";
import { getAuth, sendPasswordResetEmail } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyCdHZDe_FBsSqgZAMMRAyFWtRFhMuVUcMU",
    authDomain: "projeto-ferramentas-2.firebaseapp.com",
    databaseURL: "https://projeto-ferramentas-2-default-rtdb.firebaseio.com",
    projectId: "projeto-ferramentas-2",
    storageBucket: "projeto-ferramentas-2.firebasestorage.app",
    messagingSenderId: "885976754399",
    appId: "1:885976754399:web:5e5c900c132abfe117e16a",
    measurementId: "G-VJSEVTMX8G"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

function resetPassword(event) {
    event.preventDefault(); 

    const email = document.getElementById("email").value;
    const message = document.getElementById("message");

    sendPasswordResetEmail(auth, email)
        .then(() => {
            message.textContent = "E-mail de redefinição enviado! Verifique sua caixa de entrada.";
            message.style.color = "green";
            message.style.display = "block";
        window.location.href = "login";

        })
        .catch((error) => {
            message.textContent = "Erro: " + error.message;
            message.style.color = "red";
            message.style.display = "block";
        });
}

document.getElementById("resetForm").addEventListener("submit", resetPassword);
