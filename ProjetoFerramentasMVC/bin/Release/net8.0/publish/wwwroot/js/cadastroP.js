// Importando módulos do Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js";
import { getDatabase, ref, push, get, remove } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-database.js";

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

// Inicializando o Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

// Referências para os elementos HTML
const saveButton = document.getElementById("saveButton");
const usernameInput = document.getElementById("username");
const teacherNameInput = document.getElementById("teacherName");
const deliveryDateInput = document.getElementById("deliveryDate");
const pieceNameInput = document.getElementById("pieceName");
const quantityInput = document.getElementById("quantity");
const entradaListElement = document.getElementById("entradaList");
const devolucaoListElement = document.getElementById("devolucaoList");

// Preenche a data atual no campo de data de entrega
document.addEventListener("DOMContentLoaded", () => {
  const today = new Date().toISOString().split("T")[0];
  deliveryDateInput.value = today;
});

// Função para formatar a data para exibição
function formatDate(date) {
  const [year, month, day] = date.split("-");
  return `${day}/${month}/${year}`;
}

// Função para salvar os dados no Firebase
saveButton.addEventListener("click", () => {
  const username = usernameInput.value.trim();
  const teacherName = teacherNameInput.value.trim();
  const deliveryDate = formatDate(deliveryDateInput.value.trim());
  const pieceName = pieceNameInput.value.trim();
  const quantity = quantityInput.value.trim();

  if (username && teacherName && deliveryDate && pieceName && quantity > 0) {
    const dbRef = ref(database, "Ocupações/Usuários");

    push(dbRef, {
      username,
      teacherName,
      deliveryDate,
      pieceName,
      quantity,
    }).then(() => {
      // Limpar campos de entrada após salvar
      usernameInput.value = "";
      teacherNameInput.value = "";
      deliveryDateInput.value = "";
      pieceNameInput.value = "";
      quantityInput.value = "";
      fetchSavedData();
    });
  }
});

// Função para obter e exibir os dados de ocupações
function fetchSavedData() {
  const dbRef = ref(database, "Ocupações/Usuários");
  get(dbRef).then((snapshot) => {
    entradaListElement.innerHTML = "";
    if (snapshot.exists()) {
      Object.entries(snapshot.val()).forEach(([key, user]) => {
        const userElement = document.createElement("div");
        userElement.classList.add("entrada-item");
        userElement.innerHTML = `
          <p><strong>Aluno:</strong> ${user.username}</p>
          <p><strong>Professor:</strong> ${user.teacherName}</p>
          <p><strong>Data de Saída:</strong> ${user.deliveryDate}</p>
          <p><strong>Peça:</strong> ${user.pieceName}</p>
          <p><strong>Quantidade:</strong> ${user.quantity}</p>
          <button class='devolverButton' data-key='${key}'>Devolver</button>
        `;
        entradaListElement.appendChild(userElement);
      });
    }

    // Adiciona o evento para o botão de devolução
    document.querySelectorAll(".devolverButton").forEach((button) => {
      button.addEventListener("click", handleDevolucao);
    });
  });
}

// Função para buscar os dados de peças devolvidas
function fetchDevolvidasData() {
  const devolvidasRef = ref(database, "FerramentasDevolvidas");
  get(devolvidasRef).then((snapshot) => {
    devolucaoListElement.innerHTML = "";
    if (snapshot.exists()) {
      Object.entries(snapshot.val()).forEach(([key, item]) => {
        const itemElement = document.createElement("div");
        itemElement.classList.add("devolvida-item");
        itemElement.innerHTML = `
          <p><strong>Aluno:</strong> ${item.username}</p>
          <p><strong>Professor:</strong> ${item.teacherName}</p>
          <p><strong>Data de Saída:</strong> ${item.deliveryDate}</p>
          <p><strong>Data de Devolução:</strong> ${item.returnDate}</p>
          <p><strong>Peça:</strong> ${item.pieceName}</p>
          <p><strong>Quantidade:</strong> ${item.quantity}</p>
        `;
        devolucaoListElement.appendChild(itemElement);
      });
    }
  });
}

// Função para manipular a devolução de ferramentas
function handleDevolucao(event) {
  const key = event.target.getAttribute("data-key");
  const dbRef = ref(database, `Ocupações/Usuários/${key}`);

  get(dbRef).then((snapshot) => {
    if (snapshot.exists()) {
      const currentDate = new Date().toLocaleDateString("pt-BR");
      const devolvidasRef = ref(database, "FerramentasDevolvidas");

      // Envia os dados para a lista de devolvidas e remove da lista de ocupações
      push(devolvidasRef, { ...snapshot.val(), returnDate: currentDate }).then(
        () => {
          remove(dbRef).then(() => {
            fetchSavedData();
            fetchDevolvidasData();
          });
        }
      );
    }
  });
}

// Carrega os dados ao carregar a página
window.onload = function () {
  fetchSavedData();
  fetchDevolvidasData();
};
