var express = require("express");
var router = express.Router();

var postController = require("../controllers/postController");

router.get("/", function (_req, res) {
    postController.listarPosts(_req, res);
});

module.exports = router;