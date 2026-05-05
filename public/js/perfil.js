const usuarioLogado = sessionStorage.getItem("ID_USUARIO");

function listarTentativasPorUsuario(idUsuario) {
    fetch(`/tentativas/usuario/${idUsuario}`)
        .then(response => response.json())
        .then(data => {
            exibirTentativas(data);
        })
        .catch(error => {
            console.error("Erro ao listar tentativas:", error);
        });
}

function exibirTentativas(tentativas) {
    const tentativasContainer = document.querySelector(".tentativas-list");
    tentativasContainer.innerHTML = "";

    for (let i = 0; i < tentativas.length; i++) {
        const item = tentativas[i];

        const row = document.createElement("div");
        row.classList.add("tentativa-row");

        row.innerHTML = `
            <span class="date">${item.data_tentativa}</span>
            <span class="score">${item.pontuacao}</span>
            <span class="time">${formatarTempo(item.tempo)}</span>
        `;

        tentativasContainer.appendChild(row);
    }
}

function formatarTempo(segundos) {
    const min = Math.floor(segundos / 60);
    const sec = segundos % 60;
    return `${min}MIN${sec}s`;
}

listarTentativasPorUsuario(usuarioLogado);
