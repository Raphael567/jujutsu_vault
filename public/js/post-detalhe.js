const urlParams = new URLSearchParams(window.location.search);
const idPost = urlParams.get("id");

function carregarPost() {
    fetch(`/post/${idPost}`)
        .then(res => res.json())
        .then(dados => {

            if (!dados || dados.length === 0) {
                console.log("Post não encontrado");
                return;
            }

            preencherPost(dados[0]);
            montarComentarios(dados);
        })
        .catch(err => console.log(err));
}

function preencherPost(dado) {
    document.getElementById("categoriaPost").innerHTML = dado.categoria;
    document.getElementById("tituloPost").innerHTML = dado.titulo;

    document.getElementById("infoPost").innerHTML = `
        <div class="autor-post">
            <img src="${dado.autor_post_avatar}" class="avatar">
            <span class="nome-autor">${dado.autor_post}</span>
            <span class="separador">•</span>
            <span class="data-post">${dado.data_post}</span>
        </div>
    `;

    document.querySelector(".texto-post").innerHTML = `
        <p>${dado.conteudo}</p>
    `;
}

function montarComentarios(dados) {
    const container = document.querySelector(".lista-comentarios");

    container.innerHTML = "";

    let html = "";

    for (let i = 0; i < dados.length; i++) {
        const item = dados[i];

        if (item.comentario) {
            html += `
            <div class="comentario">
                <div class="comentario-autor">                    
                    <img src="${item.autor_comentario_avatar}" class="avatar">
                    <div class="comentario-conteudo">
                        <h4>${item.autor_comentario}</h4>
                        <p>${item.comentario}</p>
                    </div>
                </div>
            </div>
        `;
        }
    }

    container.innerHTML = html;
}

function comentar() {
    const input = document.getElementById("inputComentario");
    const comentario = input.value.trim();

    if (!comentario) {
        alert("Digite um comentário");
        return;
    }

    console.log(comentario, idPost, sessionStorage.ID_USUARIO)

    fetch("comentario/comentarios", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            conteudo: comentario,
            fkPost: idPost,
            fkUsuario: sessionStorage.ID_USUARIO
        })
    })
        .then(res => {
            if (!res.ok) {
                throw new Error("Erro ao comentar");
            }

            return res.json();
        })
        .then(() => {
            input.value = "";
            carregarPost();
        })
        .catch(err => console.log(err));
}

carregarPost();