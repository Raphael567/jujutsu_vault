function listarRanking() {
    fetch("/tentativas/ranking")
        .then(response => response.json())
        .then(data => {
            exibirRanking(data);
        })
        .catch(error => {
            console.error("Erro ao listar ranking:", error);
        });
}

function exibirRanking(ranking) {
    console.log(ranking)
    const rankingContainer = document.querySelector(".ranking-list");
    rankingContainer.innerHTML = "";

    for (let i = 0; i < ranking.length; i++) {
        const item = ranking[i];

        const row = document.createElement("div");
        row.classList.add("ranking-row");

        row.innerHTML = `
            <span class="rank">${i + 1}</span>
            <span class="name">${item.nome}</span>
            <span class="score">${item.acertos}</span>
            <span class="time">${formatarTempo(item.tempo_segundos)}</span>
            <span class="date">${item.data_tentativa}</span>
        `;

        rankingContainer.appendChild(row);
    }
}

function formatarTempo(segundos) {
    const min = Math.floor(segundos / 60);
    const sec = segundos % 60;
    return `${min}MIN${sec}s`;
}

listarRanking();

const ctx = document.querySelector(".dashboard-chart");

new Chart(ctx, {
type: 'bar',
data: {
    labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
    datasets: [{
    label: '# of Votes',
    data: [12, 19, 3, 5, 2, 3],
    borderWidth: 1
    }]
},
options: {
    scales: {
    y: {
        beginAtZero: true
    }
    }
}
});