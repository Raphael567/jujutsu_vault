const buttons = document.querySelectorAll('.item');
const sections = document.querySelectorAll('.section');
const usuarioLogado = sessionStorage.getItem("ID_USUARIO");

function inicializarMenu() {
    for (let i = 0; i < buttons.length; i++) {
        let btn = buttons[i];

        btn.onclick = () => alternarSecao(btn, i);
    }
}

function alternarSecao(btn, index) {
    atualizarBotoes(btn);
    atualizarSecoes(index);
}

function atualizarBotoes(btn) {
    for (let j = 0; j < buttons.length; j++) {
        buttons[j].classList.remove('active');
    }

    btn.classList.add('active');
}

function atualizarSecoes(index) {
    for (let k = 0; k < sections.length; k++) {
        sections[k].classList.remove('active');
    }

    sections[index].classList.add('active');
}

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

inicializarMenu();
listarTentativasPorUsuario(usuarioLogado);
