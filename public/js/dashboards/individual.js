
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
    document.getElementById("tempo-medio").innerText = formatarTempo(tempoMedio);
    document.getElementById("total-tentativas").innerText = tentativasUsuario.length;

    calcularNivel(somaPontuacao*10);
}

function formatarTempo(segundos) {
    segundos = Math.round(segundos);

    const horas = Math.floor(segundos / 3600);
    const minutos = Math.floor((segundos % 3600) / 60);
    const segundosRestantes = segundos % 60;

    if (horas > 0) return `${horas}h ${minutos}min ${segundosRestantes}s`;

    if (minutos > 0) return `${minutos}min ${segundosRestantes}s`;

    return `${segundosRestantes}s`;
}

function calcularNivel(xp) {
    let nivel = "";
    let proximoNivel = "";
    let progresso = 0;
    let faltam = 0;
    let xpAtualNivel = 0;
    let xpProximoNivel = 0;

    if (xp >= 1000) {
        nivel = "Grau Especial";
        proximoNivel = "Nível máximo";
        progresso = 100;
        faltam = "Domínio completo";
    }

    else if (xp >= 700) {
        nivel = "Grau 1";
        proximoNivel = "Grau Especial";

        xpAtualNivel = 700;
        xpProximoNivel = 1000;
    }

    else if (xp >= 450) {
        nivel = "Grau 2";
        proximoNivel = "Grau 1";

        xpAtualNivel = 450;
        xpProximoNivel = 700;
    }

    else if (xp >= 250) {
        nivel = "Grau 3";
        proximoNivel = "Grau 2";

        xpAtualNivel = 250;
        xpProximoNivel = 450;
    }

    else if (xp >= 100) {
        nivel = "Grau 4";
        proximoNivel = "Grau 3";

        xpAtualNivel = 100;
        xpProximoNivel = 250;
    }

    else {
        nivel = "Iniciante";
        proximoNivel = "Grau 4";

        xpAtualNivel = 0;
        xpProximoNivel = 100;
    }

    if (xp < 1000) {
        progresso = ((xp - xpAtualNivel) / (xpProximoNivel - xpAtualNivel)) * 100;
        faltam = `Faltam ${xpProximoNivel - xp} XP`;
    }

    document.getElementById("nivel-titulo").innerText = nivel;
    document.getElementById("proximo-nivel").innerText = `Próximo: ${proximoNivel}`;
    document.getElementById("faltam-nivel").innerText = faltam;
    document.getElementById("barra-progresso").style.width = `${progresso}%`;
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