const router = require("express").Router();
const articleController = require("../../controllers/articleController")

// api/articles
router.route("/")
.get(articleController.findAll)
.post(articleController.create);

// api/articles/:id
router.route("/:id")
.get(articleController.findById)
.put(articleController.update)
.delete(articleController.remove);

module.exports = router;