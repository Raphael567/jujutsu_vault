var express = require("express");
var router = express.Router();

var perguntaController = require("../controllers/perguntaController");

//Recebendo os dados do html e direcionando para a função listarPerguntas de perguntaController.js
router.get("/", (_req, res) => {
    perguntaController.listarPerguntas(_req, res)
})

router.get("/perguntas-respostas", (_req, res) => {
    perguntaController.listarPerguntasRespostas(_req, res)
});

module.exports = router;