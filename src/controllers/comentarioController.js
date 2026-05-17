var comentarioModel = require("../models/comentarioModel");

function listarComentarios(_req, res) {
    comentarioModel.listarComentarios()
        .then(resultado => {
            console.log(`Resultados encontrados: ${resultado.length}`);
            console.log(`Resultados: ${JSON.stringify(resultado)}`);

            res.json(resultado);
        }).catch(error => {
            console.log(error);
            res.status(500).json(error.message);
        });
}

function comentar(req, _res) {
    const conteudo = req.body.conteudo;
    const fkPost = req.body.fkPost;
    const fkUsuario = req.body.fkUsuario;
    
    comentarioModel.comentar(conteudo, fkPost, fkUsuario)
        .then(resultado => {
            console.log(`Resultados encontrados: ${resultado.length}`);
            console.log(`Resultados: ${JSON.stringify(resultado)}`);

            _res.json(resultado);
        }).catch(error => {
            console.log(error);
            _res.status(500).json(error.message);
        });
}

module.exports = {
    listarComentarios,
    comentar
}