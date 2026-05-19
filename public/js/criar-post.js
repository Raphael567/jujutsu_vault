function criarPost() {
    const titulo = iptTitulo.value.trim();
    const categoria = selectCategoria.value;
    const resumo = iptResumo.value.trim();
    const conteudo = iptConteudo.value.trim();
    const fkUsuario = sessionStorage.ID_USUARIO;

    if (titulo === "") {
        alert("Digite um título.");
        return;
    }

    if (resumo === "") {
        alert("Digite um resumo.");
        return;
    }

    if (conteudo === "") {
        alert("Digite o conteúdo do post.");
        return;
    }

    if (titulo.length < 5) {
        alert("O título deve ter pelo menos 5 caracteres.");
        return;
    }

    if (resumo.length > 255) {
        alert("O resumo pode ter no máximo 255 caracteres.");
        return;
    }

    fetch("/post/criar", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            tituloServer: titulo,
            categoriaServer: categoria,
            resumoServer: resumo,
            conteudoServer: conteudo,
            fkUsuarioServer: fkUsuario
        })
    })
    .then(function (resposta) {
        if (resposta.ok) {
            alert("Post criado com sucesso!");
            window.location.href = "./posts.html";
        } else {
            throw "Erro ao criar post";
        }
    })
    .catch(function (erro) {
        console.error(erro);
        alert("Erro ao publicar post.");
    });
}