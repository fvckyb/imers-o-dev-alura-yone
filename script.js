const cardContainer = document.querySelector(".card-container");
const campoBusca = document.querySelector("header div input");
let dados = [];

// Carrega os dados do JSON e renderiza todos os cards inicialmente.
window.onload = async () => {
    try {
        const resposta = await fetch("data.json");
        dados = await resposta.json();
        renderizarCards(dados);
    } catch (error) {
        console.error("Erro ao carregar os dados:", error);
    }
};

function iniciarBusca() {
    const termoBuscado = campoBusca.value.toLowerCase();
    const resultados = dados.filter(dado => 
        dado.nome.toLowerCase().includes(termoBuscado) || 
        dado.descrição.toLowerCase().includes(termoBuscado)
    );
    renderizarCards(resultados);
}

function renderizarCards(dados) {
    cardContainer.innerHTML = ""; // Limpa os cards existentes antes de renderizar novos
    for (let dado of dados) {
        let article = document.createElement("article");
        article.classList.add("card");
        article.innerHTML = `
            <h2>${dado.nome}</h2>
            <p>${dado.data_criacao}</p>
            <p>${dado.descricao}</p>
            <a href="${dado.link}" target="_blank">Saiba mais</a>
        `
        cardContainer.appendChild(article);
    }
}
