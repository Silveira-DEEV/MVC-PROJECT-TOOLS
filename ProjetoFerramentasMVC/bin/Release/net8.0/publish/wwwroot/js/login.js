import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-auth.js";

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

document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const messageBox = document.getElementById('messageBox');

    // Ocultar mensagem anterior
    messageBox.style.display = "none";

    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        console.log("Usuário logado:", userCredential.user);

        showMessage("✅ Login realizado com sucesso! Redirecionando...", "success");

        setTimeout(() => {
            window.location.replace("/Account/Cadastro");
        }, 2000);

    } catch (error) {
        console.error("Erro de login:", error.code, error.message);

        let errorMessage = getFriendlyErrorMessage(error.code);
        showMessage(errorMessage, "error");
    }
});

// Função para exibir mensagens de sucesso ou erro
function showMessage(message, type) {
    const messageBox = document.getElementById('messageBox');
    messageBox.textContent = message;

    // Adicionar classe para estilização
    messageBox.className = type === "success" ? "message success" : "message error";

    // Exibir mensagem suavemente
    messageBox.style.display = "block";
    messageBox.style.opacity = "0";
    setTimeout(() => messageBox.style.opacity = "1", 100);

    // Remover mensagem após 4 segundos
    setTimeout(() => {
        messageBox.style.opacity = "0";
        setTimeout(() => messageBox.style.display = "none", 500);
    }, 4000);
}

// Função para traduzir mensagens de erro do Firebase
function getFriendlyErrorMessage(errorCode) {
    const errorMessages = {
        "auth/user-not-found": "⚠️ Usuário não encontrado. Verifique seu e-mail.",
        "auth/wrong-password": "❌ Senha incorreta! Tente novamente.",
        "auth/too-many-requests": "⏳ Muitas tentativas! Aguarde um momento e tente novamente.",
        "auth/invalid-email": "📧 E-mail inválido! Verifique o formato.",
        "auth/internal-error": "🚨 Erro interno. Atualize a página e tente novamente.",
    };

    return errorMessages[errorCode] || "❗ Ocorreu um erro inesperado. Tente novamente.";
}
console.log("Arquivo JavaScript carregado!");
