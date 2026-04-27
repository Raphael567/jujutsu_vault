let perguntasRespostas = [];
let perguntaAtual = 0;
let pontuacao = 0;

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
                        gif: item.gif,
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
            
            for (let i = 0; i < perguntasRespostas.length; i++) {
                perguntasRespostas[i].respostas = embaralharPerguntasRespostas(perguntasRespostas[i].respostas);
            }

            console.log("Perguntas e Respostas: ", perguntasRespostas);
            exibirPerguntasRespostas();
        })
        .catch(erro => {
            console.error("Erro ao obter perguntas e respostas: ", erro);
        });
}

//Fisher–Yates
function embaralharPerguntasRespostas(respostas) {
    for (let i = respostas.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));

        [respostas[i], respostas[j]] = [respostas[j], respostas[i]];
    }

    return respostas;
}

function exibirPerguntasRespostas() {
    resetarRespostas();

    const titulo = document.getElementById("question_title");
    const gif = document.getElementById("question_gif");
    const respostas = document.querySelectorAll(".answers button");

    const item = perguntasRespostas[perguntaAtual];

    titulo.textContent = item.pergunta
    gif.src = item.gif;

    for (let j = 0; j < item.respostas.length; j++) {
        const resposta = item.respostas[j];

        respostas[j].textContent = resposta.resposta;
        respostas[j].onclick = () => verificarResposta(j);
    }
}

function proximaPergunta() {
    perguntaAtual++;

    if (perguntaAtual < perguntasRespostas.length) exibirPerguntasRespostas();

    esconderBotaoProximo();
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
            botoes[i].style.backgroundColor = "var(--green-zenin)";
        }

        if (!resp.correta) {
            botoes[i].style.backgroundColor = "var(--red)";
        }

        botoes[i].style.cursor = "not-allowed";
    }
}

function resetarRespostas() {
    const botoes = document.querySelectorAll(".answers button");

    for (let i = 0; i < botoes.length; i++) {
        botoes[i].disabled = false;
        botoes[i].style.backgroundColor = "";
        botoes[i].style.cursor = "pointer";
    }
}

function verificarResposta(index) {
    const resposta = perguntasRespostas[perguntaAtual].respostas[index];

    if (resposta.correta) pontuacao++;

    desabilitarRespostasEColorir(index, perguntasRespostas[perguntaAtual].respostas);
    exibirBotaoProximo();

    if (perguntaAtual === perguntasRespostas.length - 1) {
        alert(`Quiz finalizado! Sua pontuação: ${pontuacao}/${perguntasRespostas.length}`);
        finalizarQuiz();
    }
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
            idUsuarioServer: idUsuario
        })
    })
        .then(res => res.json())
        .then(data => {
            console.log("Tentativa salva:", data);
            window.location.href = "./index.html";
        })
        .catch(err => {
            console.error("Erro ao salvar tentativa:", err);
        });
}

listarPerguntasRespostas();
