const router = require("express").Router();
const articleController = require("../../controllers/nytController");

// /api/nyt
router
.route("/")
.get(articleController.findAll);

module.exports = router;
