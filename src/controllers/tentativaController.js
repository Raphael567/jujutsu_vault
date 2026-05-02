var tentativaModel = require("../models/tentativaModel");

function listarTentativas(_req, res) {
    tentativaModel.listarTentativas()
        .then(resultado => {
            console.log(`Resultados encontrados: ${resultado.length}`);
            console.log(`Resultados: ${JSON.stringify(resultado)}`);

            res.json(resultado);
        }).catch(error => {
            console.log(error);
            res.status(500).json(error.message);
        });
}

function listarRanking(_req, res) {
    tentativaModel.listarRanking()
        .then(resultado => {
            console.log(`Resultados encontrados: ${resultado.length}`);
            console.log(`Resultados: ${JSON.stringify(resultado)}`);

            res.json(resultado);
        }).catch(error => {
            console.log(error);
            res.status(500).json(error.message);
        });
}

function salvarTentativa(req, res) {
    const { pontuacaoServer, idUsuarioServer } = req.body;

    tentativaModel.salvarTentativa(pontuacaoServer, idUsuarioServer)
        .then(resultado => {
            console.log(`Tentativa salva com sucesso: ${JSON.stringify(resultado)}`);

            res.json(resultado);
        }).catch(error => {
            console.log(error);
            res.status(500).json(error.message);
        });
}

module.exports = {
    listarTentativas,
    listarRanking,
    salvarTentativa
}