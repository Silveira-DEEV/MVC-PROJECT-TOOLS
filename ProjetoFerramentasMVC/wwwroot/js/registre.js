import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-auth.js";

// Configuração do Firebase
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

document.getElementById('registerForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const errorMessageBox = document.getElementById('errorMessage');
    const successMessageBox = document.getElementById('successMessage');

    // Escondendo as mensagens anteriores
    errorMessageBox.style.display = 'none';
    successMessageBox.style.display = 'none';

    try {
        // Criar o usuário no Firebase
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        console.log("Usuário registrado:", userCredential.user);
        showMessage("🎉 Registro realizado com sucesso! Redirecionando...", "success");
        setTimeout(() => window.location.href = "index.html", 2000);
    } catch (error) {
        if (error.code === 'auth/email-already-in-use') {
            // Exibe mensagem personalizada se o e-mail já estiver em uso
            showMessage("⚠️ Este e-mail já está em uso. Por favor, tente outro ou faça login.", "error");
        } else {
            // Para qualquer outro erro, exibe uma mensagem genérica
            showMessage("❗ Ocorreu um erro inesperado. Tente novamente.", "error");
        }
    }
});

// Função para exibir mensagens de forma estilizada
function showMessage(message, type) {
    const messageBox = document.getElementById(type === "error" ? 'errorMessage' : 'successMessage');
    messageBox.textContent = message;
    messageBox.style.display = "block";

    // Adicionar classe para estilização
    messageBox.className = type === "success" ? "message success" : "message error";

    // Exibir mensagem com fade-in
    messageBox.style.opacity = "0";
    setTimeout(() => messageBox.style.opacity = "1", 100);

    // Remover mensagem após 4 segundos
    setTimeout(() => {
        messageBox.style.opacity = "0";
        setTimeout(() => messageBox.style.display = "none", 500);
    }, 4000);
}
