var express = require("express");
var router = express.Router();

var respostaUsuarioController = require("../controllers/respostaUsuarioController");

//Recebendo os dados do html e direcionando para a função listarRespostas de respostaController.js
router.get("/", (_req, res) => {
    respostaUsuarioController.listarRespostasUsuario(_req, res);
})

module.exports = router;