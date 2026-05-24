const container = document.getElementById("container_personagens");

for (let i = 0; i < cards.length; i++) {
    const card = cards[i];
    container.innerHTML += `
        <div class="card-personagem">
            <a href="./personagem.html?id=${card.id}">
                <img class="img-hover" src="${card.imagem}" alt="${card.alt}">
            </a>
        </div>
    `;
}
