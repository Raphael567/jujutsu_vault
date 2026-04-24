var express = require("express");
var router = express.Router();

var respostaController = require("../controllers/respostaController");

//Recebendo os dados do html e direcionando para a função listarRespostas de respostaController.js
router.get("/", (_req, res) => {
    respostaController.listarRespostas(_req, res);
})

module.exports = router;