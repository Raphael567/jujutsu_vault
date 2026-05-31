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

function listarTentativasPorUsuario(req, res) {
    const idUsuario = req.params.idUsuario;

    tentativaModel.listarTentativasPorUsuario(idUsuario)
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
    const pontuacao = req.body.pontuacaoServer;
    const tempoSegundos = req.body.tempoSegundosServer;
    const idUsuario = req.body.idUsuarioServer;

    console.log(pontuacao, tempoSegundos, idUsuario)

    tentativaModel.salvarTentativa(pontuacao, tempoSegundos, idUsuario)
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
    listarTentativasPorUsuario,
    salvarTentativa
}