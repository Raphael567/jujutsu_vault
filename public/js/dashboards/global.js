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
    gerarGrafico(tentativas);
}

function gerarGrafico(tentativas) {
    const ctx = document.querySelector(".dashboard-chart");

    const distribuicao = [0, 0, 0, 0, 0, 0];

    for (let i = 0; i < tentativas.length; i++) {
        const pontuacao = tentativas[i].pontuacao;
        distribuicao[pontuacao]++;
    }

    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['0', '1', '2', '3', '4', '5'],
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
                    ticks: {
                        stepSize: 1
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
                        weight: '500',
                        family: 'Cinzel, serif'
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

    document.getElementById("media-acertos").innerText = media.toFixed(1) + "/5";
    document.getElementById("total-jogadores").innerText = totalJogadores;
    document.getElementById("tempo-medio").innerText = Math.round(tempoMedio) + "s";
}

listarTentativas();