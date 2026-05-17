var express = require("express");
var router = express.Router();

var comentarioController = require("../controllers/comentarioController");

router.get("/", function (_req, res) {
    comentarioController.listarComentarios(_req, res);
});

router.post("/comentarios", function (req, _res) {
    comentarioController.comentar(req, _res);
})

module.exports = router;