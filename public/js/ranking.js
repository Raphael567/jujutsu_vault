function listarRanking() {
    fetch("/tentativas/ranking")
        .then(response => response.json())
        .then(data => {
            exibirRanking(data);
        })
        .catch(error => {
            console.error("Erro ao listar ranking:", error);
        });
}

function exibirRanking(ranking) {
    const rankingContainer = document.querySelector(".ranking-list");
    rankingContainer.innerHTML = "";

    const usuarioLogado = sessionStorage.getItem("ID_USUARIO");

    for (let i = 0; i < ranking.length; i++) {
        const item = ranking[i];

        const row = document.createElement("div");
        row.classList.add("ranking-row");

        if (item.id == usuarioLogado) {
            row.classList.add("me");
            let posicoes = document.querySelectorAll("#posicao-usuario");
            for(let i = 0; i < posicoes.length; i++) {
                posicoes[i].innerHTML = "#" + (i + 1);
            }
        }

        row.innerHTML = `
            <span class="rank">${i + 1}</span>
            <span class="name">${item.nome}</span>
            <span class="score">${item.pontuacao}</span>
            <span class="time">${item.tempo_segundos}s</span>
            <span class="date">${item.data_tentativa}</span>
        `;

        rankingContainer.appendChild(row);
    }
}

listarRanking();
