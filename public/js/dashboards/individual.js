
function listarTentativasPorUsuario(idUsuario) {
    fetch(`/tentativas/usuario/${idUsuario}`)
        .then(response => response.json())
        .then(data => {
            carregarDashboard(data);
        })
        .catch(error => {
            console.error("Erro ao listar tentativas:", error);
        });
}

function carregarDashboard(tentativas) {
    calcularKPIsUsuario(tentativas);
    gerarGraficoUsuario(tentativas);
}

function calcularKPIsUsuario(tentativasUsuario) {
    if (tentativasUsuario.length === 0) return;

    let somaPontuacao = 0;
    let somaTempo = 0;
    let melhor = 0;

    for (let i = 0; i < tentativasUsuario.length; i++) {
        const pontuacao = tentativasUsuario[i].pontuacao;
        const tempo = tentativasUsuario[i].tempo;

        somaPontuacao += pontuacao;
        somaTempo += tempo;

        if (pontuacao > melhor) melhor = pontuacao;
    }

    const media = somaPontuacao / tentativasUsuario.length;
    const tempoMedio = somaTempo / tentativasUsuario.length;

    document.getElementById("media-acertos").innerText = media.toFixed(1) + "/10";
    document.getElementById("melhor-pontuacao").innerText = melhor + "/10";
    document.getElementById("tempo-medio").innerText = Math.round(tempoMedio) + "s";
    document.getElementById("total-tentativas").innerText = tentativasUsuario.length;

    calcularNivel(media, tentativasUsuario.length);
}

function calcularNivel(media, tentativas) {
    let nivel = "";
    let proximoNivel = "";
    let progresso = 0;
    let faltam = "";

    if (tentativas < 3) {
        nivel = "Em treinamento";
        proximoNivel = "Grau 4";
        progresso = (tentativas / 3) * 100;
        faltam = `Faltam ${3 - tentativas} quizzes`;
    }
    else if (media >= 4.5 && tentativas >= 10) {
        nivel = "Grau Especial";
        proximoNivel = "Nível máximo";
        progresso = 100;
        faltam = "Domínio completo";
    }
    else if (media >= 4) {
        nivel = "Grau 1";
        progresso = (media / 4.5) * 100;

        const pontos = (4.5 - media).toFixed(1);
        const quizzes = 10 - tentativas;

        if (tentativas < 10) {
            faltam = `Faltam ${quizzes} quizzes`;
        } else {
            faltam = `Faltam ${pontos} pontos de média`;
        }

        proximoNivel = "Grau Especial";
    }
    else if (media >= 3) {
        nivel = "Grau 2";
        progresso = (media / 4) * 100;
        faltam = `Faltam ${(4 - media).toFixed(1)} pontos`;
        proximoNivel = "Grau 1";
    }
    else if (media >= 2.5) {
        nivel = "Grau 3";
        progresso = (media / 3) * 100;
        faltam = `Faltam ${(3 - media).toFixed(1)} pontos`;
        proximoNivel = "Grau 2";
    }
    else if (media >= 2) {
        nivel = "Grau 4";
        progresso = (media / 2.5) * 100;
        faltam = `Faltam ${(2.5 - media).toFixed(1)} pontos`;
        proximoNivel = "Grau 3";
    }
    else {
        nivel = "Iniciante";
        progresso = (media / 2) * 100;
        faltam = `Faltam ${(2 - media).toFixed(1)} pontos`;
        proximoNivel = "Grau 4";
    }

    document.getElementById("nivel-titulo").innerText = nivel;
    document.getElementById("proximo-nivel").innerText = `Próximo: ${proximoNivel}`;
    document.getElementById("faltam-nivel").innerText = faltam;
    document.getElementById("barra-progresso").style.width = `${Math.min(progresso, 100)}%`;
}

function gerarGraficoUsuario(tentativasUsuario) {

    const ctx = document.querySelector(".dashboard-chart");

    const labels = [];
    const dados = [];

    let totalAcertos = 0;

    for (let i = 0; i < tentativasUsuario.length; i++) {
        labels.push("#" + (i + 1));

        const pontuacao = tentativasUsuario[i].pontuacao;

        dados.push(pontuacao);

        totalAcertos += pontuacao;
    }

    new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'Evolução de Acertos',
                data: dados,
                borderWidth: 5,
                tension: 0.5,
                backgroundColor: '#000',
                borderColor: '#000'
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true,
                    max: 10,
                    ticks: {
                        stepSize: 1,
                        color: '#000',
                        font: {
                            size: 18,
                            weight: '600'
                        }
                    }
                },

                x: {
                    ticks: {
                        color: '#000',
                        font: {
                            size: 18,
                            weight: '600'
                        }
                    }
                }
            },
            plugins: {
                title: {
                    display: true,
                    text: 'Evolução de Acertos do Usuário',
                    color: '#000',
                    font: {
                        size: 32,
                        weight: '800',
                        family: 'Cinzel, serif'
                    }
                },

                legend: {
                    labels: {
                        color: '#000',
                        font: {
                            size: 20,
                            weight: '500'
                        }
                    }
                }
            }
        },
    });

    const totalQuestoes = tentativasUsuario.length * 10;
    const totalErros = totalQuestoes - totalAcertos;

    const ctxPizza = document.querySelector(".dashboard-pizza");

    new Chart(ctxPizza, {
        type: 'doughnut',
        data: {
            labels: ['Acertos', 'Erros'],
            datasets: [{
                data: [totalAcertos, totalErros],
                backgroundColor: [
                    '#518A43',
                    '#a00000'
                ],
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            plugins: {
                title: {
                    display: true,
                    text: 'Proporção de Acertos e Erros',
                    color: '#000',
                    font: {
                        size: 32,
                        weight: '800',
                        family: 'Cinzel, serif'
                    }
                },
                legend: {
                    labels: {
                        color: '#000',
                        font: {
                            size: 20
                        }
                    }
                }
            }
        }
    });
}

listarTentativasPorUsuario(usuarioLogado);