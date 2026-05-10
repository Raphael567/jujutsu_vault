var express = require("express");
var router = express.Router();

var usuarioController = require("../controllers/usuarioController");

//Recebendo os dados do html e direcionando para a função cadastrar de usuarioController.js
router.post("/cadastrar", function (req, res) {
    usuarioController.cadastrar(req, res);
})

router.post("/autenticar", function (req, res) {
    usuarioController.autenticar(req, res);
});

router.post("/verificarSenha", function (req, res) {
    usuarioController.verificarSenha(req, res);
});

router.put("/atualizarNome", function (req, res) {
    usuarioController.atualizarNome(req, res);
});

router.put("/atualizarEmail", function (req, res) {
    usuarioController.atualizarEmail(req, res);
});

router.put("/atualizarSenha", function (req, res) {
    usuarioController.atualizarSenha(req, res);
});

router.put("/atualizarAvatar", function (req, res) {
    usuarioController.atualizarAvatar(req, res);
});

router.get("/", function (_req, res) {
    usuarioController.listar(_req, res);
});

module.exports = router;