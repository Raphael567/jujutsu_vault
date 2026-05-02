var express = require("express");
var router = express.Router();

var perfilController = require("../controllers/perfilController");

router.post("/cadastrar", function (req, res) {
    perfilController.cadastrar(req, res);
});

router.put("/atualizar", function (req, res) {
    perfilController.atualizar(req, res);
});

router.get("/listar/:fkUsuario", function (req, res) {
    perfilController.listarPorUsuario(req, res);
});

module.exports = router;