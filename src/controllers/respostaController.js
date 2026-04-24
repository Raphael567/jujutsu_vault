var respostaModel = require("../models/respostaModel");

function listarRespostas(_req, res) {
    respostaModel.listarRespostas()
        .then(resultado => {
            console.log(`Resultados encontrados: ${resultado.length}`);
            console.log(`Resultados: ${JSON.stringify(resultado)}`);

            res.json(resultado);
        }).catch(error => {
            console.log(error);
            res.status(500).json(error.message);
        })
}

module.exports = {
    listarRespostas
}