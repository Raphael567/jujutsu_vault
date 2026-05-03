const tentativasMock = [
    { usuario: "Raphael", pontuacao: 3, tempo: 40 },
    { usuario: "Lucas", pontuacao: 5, tempo: 30 },
    { usuario: "Lucas", pontuacao: 5, tempo: 25 },
    { usuario: "Ana", pontuacao: 4, tempo: 35 },
    { usuario: "Raphael", pontuacao: 4, tempo: 38 },
    { usuario: "Pedro", pontuacao: 2, tempo: 50 },
    { usuario: "Lucas", pontuacao: 5, tempo: 28 },
    { usuario: "Ana", pontuacao: 3, tempo: 45 }
];

function gerarGraficoMock() {
    const ctx = document.querySelector(".dashboard-chart");

    const distribuicao = [0, 0, 0, 0, 0, 0];

    for (let i = 0; i < tentativasMock.length; i++) {
        const pontuacao = tentativasMock[i].pontuacao;
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

function calcularKPIsMock() {
    if (tentativasMock.length === 0) return;

    let somaPontuacao = 0;
    let somaTempo = 0;
    const usuarios = [];

    for (let i = 0; i < tentativasMock.length; i++) {
        somaPontuacao += tentativasMock[i].pontuacao;
        somaTempo += tentativasMock[i].tempo;

        const usuario = tentativasMock[i].usuario;

        if (!usuarios.includes(usuario)) {
            usuarios.push(usuario);
        }
    }

    const media = somaPontuacao / tentativasMock.length;
    const tempoMedio = somaTempo / tentativasMock.length;
    const totalJogadores = usuarios.length;

    document.getElementById("media-acertos").innerText = media.toFixed(1) + "/5";
    document.getElementById("total-jogadores").innerText = totalJogadores;
    document.getElementById("tempo-medio").innerText = Math.round(tempoMedio) + "s";
}

listarRanking();
gerarGraficoMock();
calcularKPIsMock();