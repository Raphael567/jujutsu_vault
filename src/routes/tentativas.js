var express = require("express");
var router = express.Router();

var tentativaController = require("../controllers/tentativaController");

//Recebendo os dados do html e direcionando para a função listarTentativas de tentativaController.js
router.get("/", (_req, res) => {
    tentativaController.listarTentativas(_req, res);
})

router.post("/salvar", (req, res) => {
    tentativaController.salvarTentativa(req, res);
})

module.exports = router;