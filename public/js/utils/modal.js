const imagens = document.querySelectorAll(".imagem-cena");
const modal = document.getElementById("modalCena");
const imagemModal = document.getElementById("imagemModal");
const fecharModal = document.getElementById("fecharModal");
const btnAnterior = document.getElementById("anterior");
const btnProximo = document.getElementById("proximo");

let imagemAtual = 0;

for (let i = 0; i < imagens.length; i++) {

    imagens[i].addEventListener("click", () => { 
        modal.classList.add("ativo");
        imagemAtual = i;
        atualizarImagem();
    });
}

function atualizarImagem() {
    imagemModal.src = imagens[imagemAtual].src;
}

btnProximo.addEventListener("click", () => {

    imagemAtual++;

    if(imagemAtual >= imagens.length) {
        imagemAtual = 0;
    }

    atualizarImagem();

});

btnAnterior.addEventListener("click", () => {

    imagemAtual--;

    if(imagemAtual < 0) {
        imagemAtual = imagens.length - 1;
    }

    atualizarImagem();

});

fecharModal.addEventListener("click", () => {

    modal.classList.remove("ativo");

});

modal.addEventListener("click", (event) => {

    if(event.target === modal) {

        modal.classList.remove("ativo");

    }

});
