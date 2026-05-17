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

module.exports = {
    listarPosts
}