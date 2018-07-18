const axios = require("axios");
const db = require("../models");

//finds all search by nyt api and return only the info from the nyt. 
module.exports = {
    findAll: function (req, res) {
        const params = Object.assign(
            { api_key: "4407a1039c67043688b2f81c179d28784" },
            req.query);
        axios
            .get("https://api.nytimes.com/svc/search/v2/articlesearch.json", {
                params
            })
            .then(response => {
                db.Article
                    .find()
                    .then(dbArticles =>
                        response.data.response.docs.filter(article =>
                            dbArticles.every(
                                dbArticle => dbArticle._id.toString() !== article._id
                            )
                        )
                    )
                    .then(articles => res.json(articles))
                    .catch(err => res.status(422).json(err));
            });
    }
}
