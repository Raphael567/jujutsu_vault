var postModel = require("../models/postModel");

function listarPosts(_req, res) {
    postModel.listarPosts()
        .then(resultado => {
            console.log(`Resultados encontrados: ${resultado.length}`);
            console.log(`Resultados: ${JSON.stringify(resultado)}`);

            res.json(resultado);
        }).catch(error => {
            console.log(error);
            res.status(500).json(error.message);
        });
}

function buscarPostPorId(req, res) {
    const idPost = req.params.idPost;

    postModel.buscarPostPorId(idPost)
        .then(resultado => {
            console.log(`Resultados encontrados: ${resultado.length}`);
            console.log(`Resultados: ${JSON.stringify(resultado)}`);

            if (resultado.length == 0) {
                return res.status(404).json({ mensagem: "Post não encontrado" });
            }

            res.json(resultado);
        }).catch(error => {
            console.log(error);
            res.status(500).json(error.message);
        });
}

function criar(req, res) {
    const titulo = req.body.tituloServer;
    const resumo = req.body.resumoServer;
    const conteudo = req.body.conteudoServer;
    const categoria = req.body.categoriaServer;
    const fkUsuario = req.body.fkUsuarioServer;

    postModel.criar(titulo, resumo, conteudo, categoria, fkUsuario)
        .then(function (resultado) {
            res.json(resultado);
        })
        .catch(function (erro) {
            res.status(500).json(erro.sqlMessage);
        });
}

module.exports = {
    listarPosts,
    buscarPostPorId,
    criar
}