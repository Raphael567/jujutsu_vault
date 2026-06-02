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
    const usuarioLogado = sessionStorage.getItem("ID_USUARIO");
    
    rankingContainer.innerHTML = "";
    for (let i = 0; i < ranking.length; i++) {
        const item = ranking[i];

        const row = document.createElement("div");
        row.classList.add("ranking-row");

        if (item.id == usuarioLogado) {
            row.classList.add("me");

            let posicoes = document.querySelectorAll("#posicao-usuario");
            for(let j = 0; j < posicoes.length; j++) {
                posicoes[j].innerHTML = "#" + (i + 1);
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
