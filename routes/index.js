const router = require("express").Router();
const articleRoutes = require("./api/articles.js");
const nytRoutes = require("./api/nyt.js");

// routes
router.use("/articles", articleRoutes);
router.use("/nyt", nytRoutes);

module.exports = router;