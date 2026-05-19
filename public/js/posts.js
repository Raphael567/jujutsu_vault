let todosPosts = [];

function listarPosts() {
    fetch("/post/")
        .then(function (resposta) {
            if (resposta.ok) {
                return resposta.json();
            }

            throw new Error("Erro ao buscar posts");
        })
        .then(function (posts) {
            todosPosts = posts;
            renderizarPosts(posts);
            configurarFiltros();
        })
        .catch(function (erro) {
            console.error("Erro:", erro);
        });
}

function renderizarPosts(posts) {
    const grid = document.querySelector(".grid-posts");

    grid.innerHTML = "";

    for (let i = 0; i < posts.length; i++) {
        grid.innerHTML += `
            <article class="card-post">
                <div class="conteudo-post">
                    <span class="categoria">${posts[i].categoria}</span>
                    <h2>${posts[i].titulo}</h2>
                    <p>${posts[i].resumo}</p>
                </div>
            </article>
        `;
    }
}

function configurarFiltros() {
    const botoes = document.querySelectorAll(".filtros button");

    for (let i = 0; i < botoes.length; i++) {
        botoes[i].addEventListener("click", function () {

            for (let j = 0; j < botoes.length; j++) {
                botoes[j].classList.remove("ativo");
            }

            botoes[i].classList.add("ativo");

            const categoria = botoes[i].textContent.trim();

            if (categoria === "Todos") {
                renderizarPosts(todosPosts);
            } else {
                let postsFiltrados = [];

                for (let j = 0; j < todosPosts.length; j++) {
                    if (todosPosts[j].categoria === categoria) {
                        postsFiltrados.push(todosPosts[j]);
                    }
                }

                renderizarPosts(postsFiltrados);
            }
        });
    }
}

listarPosts();