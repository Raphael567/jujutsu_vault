function listarTentativas() {
    fetch("/tentativas")
        .then(response => response.json())
        .then(data => {
            exibirGraficoEKPIs(data);
        })
        .catch(error => {
            console.error("Erro ao listar tentativas:", error);
        });
}

function exibirGraficoEKPIs(tentativas) {
    calcularKPIs(tentativas);
    gerarGraficoBarras(tentativas);
    gerarGraficoPizza(tentativas);
}

function gerarGraficoBarras(tentativas) {
    const ctx = document.querySelector(".dashboard-chart");

    const distribuicao = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

    for (let i = 0; i < tentativas.length; i++) {
        const pontuacao = tentativas[i].pontuacao;
        distribuicao[pontuacao]++;
    }

    console.log(tentativas);

    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
            datasets: [{
                label: 'Distribuição de Acertos',
                data: distribuicao,
                borderWidth: 1,
                backgroundColor: '#000'
            }]
        },
        options: {
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
                    text: 'Distribuição de Acertos dos Jogadores',
                    color: '#000',
                    font: {
                        size: 32,
                        weight: '800',
                        family: 'Cinzel, serif'
                    }
                }
            }
        }
    });
}

function gerarGraficoPizza(tentativas) {

    const ctx = document.querySelector(".dashboard-pizza");

    let baixo = 0;
    let medio = 0;
    let alto = 0;

    for (let i = 0; i < tentativas.length; i++) {

        const p = tentativas[i].pontuacao;

        if (p <= 3) baixo++;
        else if (p <= 7) medio++;
        else alto++;
    }

    new Chart(ctx, {
        type: 'pie',
        data: {
            labels: ['Baixo (0-3)', 'Médio (4-7)', 'Alto (8-10)'],
            datasets: [{
                data: [baixo, medio, alto],
                backgroundColor: ['#a00000', '#D6CD81', '#518A43']
            }]
        },
        options: {
            plugins: {
                title: {
                    display: true,
                    text: 'Distribuição de Desempenho',
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

function calcularKPIs(tentativas) {
    if (tentativas.length === 0) return;

    let somaPontuacao = 0;
    let somaTempo = 0;
    const usuarios = [];

    for (let i = 0; i < tentativas.length; i++) {
        somaPontuacao += tentativas[i].pontuacao;
        somaTempo += tentativas[i].tempo;

        const usuario = tentativas[i].id_usuario;

        if (!usuarios.includes(usuario)) {
            usuarios.push(usuario);
        }
    }

    const media = somaPontuacao / tentativas.length;
    const tempoMedio = somaTempo / tentativas.length;
    const totalJogadores = usuarios.length;
    const totalTentativas = tentativas.length;

    document.getElementById("media-acertos").innerText = media.toFixed(1) + "/10";
    document.getElementById("total-jogadores").innerText = totalJogadores;
    document.getElementById("tempo-medio").innerText = Math.round(tempoMedio) + "s";
    document.getElementById("total-tentativas").innerText = totalTentativas;
}

listarTentativas();