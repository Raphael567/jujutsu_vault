var express = require("express");
var router = express.Router();

var comentarioController = require("../controllers/comentarioController");

router.get("/", function (_req, res) {
    comentarioController.listarComentarios(_req, res);
});

module.exports = router;