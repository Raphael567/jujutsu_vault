const parametros = new URLSearchParams(window.location.search);
const id = parametros.get("id");
const personagem = personagens[id];

if (!personagem) {
    window.location.href = "./personagens.html";
}

document.body.style.background = `
    radial-gradient(
    circle at center,
    ${personagem.cor},
    #000 70%
    )
`;

document.querySelector(".infos h1").textContent = personagem.nome;
document.querySelector(".infos p").textContent = personagem.descricao;
document.querySelector(".status").innerHTML = `
    <span>Altura: ${personagem.altura}</span>
    <span>Peso: ${personagem.peso}</span>
    <span>Gosta: ${personagem.gosta}</span>
    <span>Odeia: ${personagem.odeia}</span>
`;
document.querySelector(".imagem-principal img").src = personagem.imagemPrincipal;

const galeria = document.querySelector(".galeria");
galeria.innerHTML = "";

for (let i = 0; i < personagem.cenas.length; i++) {
    const cena = personagem.cenas[i];

    galeria.innerHTML += `<img class="imagem-cena" src="${cena}">`;
}
