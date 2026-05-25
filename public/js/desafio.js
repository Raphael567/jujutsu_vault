let perguntasRespostas = [];
let perguntaAtual = 0;
let totalPerguntas = 0;
let pontuacao = 0;
let tempoSegundos = 0;
let intervaloTempo;

function listarPerguntasRespostas() {
    fetch("/perguntas/perguntas-respostas")
        .then(resposta => resposta.json())
        .then(resposta => {

            if (resposta.length === 0) return;

            let temp = resposta[0].id_pergunta;
            let perguntasMap = {};

            for (let i = 0; i < resposta.length; i++) {
                const item = resposta[i];

                if (temp != item.id_pergunta || i == 0) {
                    temp = item.id_pergunta;

                    perguntasMap = {
                        id_pergunta: item.id_pergunta,
                        pergunta: item.pergunta,
                        gif_local: item.gif_local,
                        gif_url: item.gif_url,
                        respostas: []
                    }

                    perguntasRespostas.push(perguntasMap);
                }

                perguntasMap.respostas.push({
                    id_resposta: item.id_resposta,
                    resposta: item.resposta,
                    correta: item.correta
                })
            }


            perguntasRespostas = embaralharPerguntasRespostas(perguntasRespostas);
            totalPerguntas = perguntasRespostas.length;

            for (let i = 0; i < perguntasRespostas.length; i++) {
                perguntasRespostas[i].respostas = embaralharPerguntasRespostas(perguntasRespostas[i].respostas);
            }

            console.log("Perguntas e Respostas: ", perguntasRespostas);

            atualizarBarraProgresso();
            exibirPerguntasRespostas();
            iniciarContador();
        })
        .catch(erro => {
            console.error("Erro ao obter perguntas e respostas: ", erro);
        });
}

function embaralharPerguntasRespostas(lista) {
    let novaLista = [];

    while (lista.length > 0) {
        let indiceAleatorio = Math.floor(Math.random() * lista.length);

        novaLista.push(lista[indiceAleatorio]);

        lista.splice(indiceAleatorio, 1);
    }

    return novaLista;
}

function atualizarBarraProgresso() {
    const barra = document.getElementById("progress-bar");

    const progresso = ((perguntaAtual + 1) / totalPerguntas) * 100;

    barra.style.width = `${progresso}%`;
}

function exibirPerguntasRespostas() {
    pausarContador();
    resetarRespostas();

    const titulo = document.getElementById("question_title");
    const gif = document.getElementById("question_gif");
    const respostas = document.querySelectorAll(".answers button");
    const container = document.querySelector(".desafio-content");

    const item = perguntasRespostas[perguntaAtual];

    titulo.textContent = item.pergunta;

    // limpa imagem anterior
    gif.src = "";

    gif.onload = () => {

        // libera só quando o gif terminar de carregar
        container.style.opacity = "1";
        container.style.pointerEvents = "auto";

        iniciarContador();
    };

    gif.src = item.gif_local || item.gif_url;

    for (let j = 0; j < item.respostas.length; j++) {
        const resposta = item.respostas[j];

        respostas[j].textContent = resposta.resposta;
        respostas[j].onclick = () => verificarResposta(j);
    }

    atualizarBarraProgresso();
}

function iniciarContador() {
    clearInterval(intervaloTempo);

    intervaloTempo = setInterval(() => {

        tempoSegundos++;

        document.getElementById("tempo-display").innerText = tempoSegundos + "s";

    }, 1000);
}

function pausarContador() {
    clearInterval(intervaloTempo);
}

function proximaPergunta() {
    perguntaAtual++;

    esconderBotaoProximo();

    if (perguntaAtual >= perguntasRespostas.length) {
        mostrarTelaFinal();
        return;
    }

    exibirPerguntasRespostas();
    atualizarBarraProgresso();
}

function exibirBotaoProximo() {
    const botaoProximo = document.getElementById("next_question");
    botaoProximo.style.display = "block";
}

function esconderBotaoProximo() {
    const botaoProximo = document.getElementById("next_question");
    botaoProximo.style.display = "none";
}

function desabilitarRespostasEColorir(index, respostas) {
    const botoes = document.querySelectorAll(".answers button");

    for (let i = 0; i < botoes.length; i++) {
        const resp = respostas[i];
        if (!resp) continue;

        botoes[i].disabled = true;

        if (resp.correta) {
            botoes[i].style.backgroundColor = "var(--light-green-zenin)";
            botoes[i].style.color = "var(--white)";
        }

        if (!resp.correta) {
            botoes[i].style.backgroundColor = "var(--red)";
            botoes[i].style.color = "var(--white)";
        }

        botoes[i].style.cursor = "not-allowed";
    }
}

function resetarRespostas() {
    const botoes = document.querySelectorAll(".answers button");

    for (let i = 0; i < botoes.length; i++) {
        botoes[i].disabled = false;
        botoes[i].style.backgroundColor = "";
        botoes[i].style.color = "";
        botoes[i].style.cursor = "pointer";
    }
}

function verificarResposta(index) {
    const resposta = perguntasRespostas[perguntaAtual].respostas[index];

    if (resposta.correta) pontuacao++;

    desabilitarRespostasEColorir(index, perguntasRespostas[perguntaAtual].respostas);
    exibirBotaoProximo();
}

function finalizarQuiz() {
    const idUsuario = sessionStorage.getItem("ID_USUARIO");

    fetch("/tentativas/salvar", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            pontuacaoServer: pontuacao,
            tempoSegundosServer: tempoSegundos,
            idUsuarioServer: idUsuario
        })
    })
        .then(res => res.json())
        .then(data => {
            console.log("Tentativa salva:", data);
        })
        .catch(err => {
            console.error("Erro ao salvar tentativa:", err);
        });
}

function mostrarTelaFinal() {
    pausarContador();

    const container = document.querySelector(".desafio-container");

    let mensagem = "";
    let gif = "";

    const porcentagem = (pontuacao / perguntasRespostas.length) * 100;

    if (porcentagem <= 40) {

        mensagem = "Você precisa treinar mais suas técnicas amaldiçoadas!";
        gif = "./assets/gifs/result1.gif";

    }

    else if (porcentagem <= 70) {

        mensagem = "Nada mal! Você já é um feiticeiro promissor.";
        gif = "./assets/gifs/result2.gif";

    }

    else {

        mensagem = "Incrível! Você alcançou nível especial no universo Jujutsu!";
        gif = "./assets/gifs/result3.gif";

    }

    container.innerHTML = `
        <div class="resultado-final">

            <h1>Quiz Finalizado!</h1>

            <img 
                id="question_gif" 
                src="${gif}" 
                alt="Resultado Final"
            >

            <p>
                Você acertou ${pontuacao} de ${perguntasRespostas.length} perguntas!
            </p>
            
            <p>
                Tempo total: ${tempoSegundos} segundos
            </p>

            <h2>
                ${mensagem}
            </h2>

            <button class="btn" onclick="irParaRanking()">
                Ver Ranking
            </button>

        </div>
    `;

    finalizarQuiz();
}

function irParaRanking() {
    window.location.href = "./ranking.html";
}

listarPerguntasRespostas();
