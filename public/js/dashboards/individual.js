const tentativasUsuario = [
    { pontuacao: 3, tempo: 40, data: "2026-05-01" },
    { pontuacao: 4, tempo: 35, data: "2026-05-02" },
    { pontuacao: 5, tempo: 30, data: "2026-05-03" },
    { pontuacao: 4, tempo: 38, data: "2026-05-04" }
];

function calcularKPIsUsuario() {
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

    document.getElementById("media-acertos").innerText = media.toFixed(1) + "/5";
    document.getElementById("melhor-pontuacao").innerText = melhor + "/5";
    document.getElementById("tempo-medio").innerText = Math.round(tempoMedio) + "s";
    document.getElementById("total-tentativas").innerText = tentativasUsuario.length;

    calcularNivel(media, tentativasUsuario.length);
}

function calcularNivel(media, tentativas) {
    let nivel = "";
    let proximoNivel = "";
    let progresso = 0;

    if (tentativas < 3) {
        nivel = "Em treinamento";
        proximoNivel = "Faça mais quizzes";
    }
    else if (media >= 4.5 && tentativas >= 10) {
        nivel = "Grau Especial";
        proximoNivel = "Nível máximo";
        progresso = 100;
    }
    else if (media >= 4) {
        nivel = "Grau 1";
        progresso = (media / 4.5) * 100;
        proximoNivel = `${Math.min(progresso, 100).toFixed(0)}% Especial`;
    }
    else if (media >= 3) {
        nivel = "Grau 2";
        progresso = (media / 4) * 100;
        proximoNivel = `${Math.min(progresso, 100).toFixed(0)}% Grau 1`;
    }
    else if (media >= 2.5) {
        nivel = "Grau 3";
        progresso = (media / 3) * 100;
        proximoNivel = `${Math.min(progresso, 100).toFixed(0)}% Grau 2`;
    }
    else if (media >= 2) {
        nivel = "Grau 4";
        progresso = (media / 2.5) * 100;
        proximoNivel = `${Math.min(progresso, 100).toFixed(0)}% Grau 3`;
    }
    else {
        nivel = "Iniciante";
        progresso = (media / 2) * 100;
        proximoNivel = `${Math.min(progresso, 100).toFixed(0)}% Grau 4`;
    }

    document.getElementById("nivel").innerText = nivel;
    document.getElementById("proximo-nivel").innerText = proximoNivel;
}

function gerarGraficoUsuario() {
    const ctx = document.querySelector(".dashboard-chart");

    const labels = [];
    const dados = [];

    for (let i = 0; i < tentativasUsuario.length; i++) {
        labels.push("#" + (i + 1));
        dados.push(tentativasUsuario[i].pontuacao);
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
            scales: {
                y: {
                    beginAtZero: true,
                    max: 5,
                    ticks: {
                        stepSize: 1
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
                        weight: '500',
                        family: 'Cinzel, serif'
                    }
                }
            }
        }
    });
}

calcularKPIsUsuario();
gerarGraficoUsuario();