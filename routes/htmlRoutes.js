var db = require("../models");

module.exports = function(app) {

// Load index page
app.get("/", function(req, res) {
    res.render("index")
});

// Load index page
app.get("/index", function(req, res) {
    res.render("index")
});

// Load saved articles
app.get("/savedArticles", function(req, res) {

    db.Article.find({ saved: true })
    .then(function (dbArticle) {
      // console.log("dbArticle is: ", dbArticle);
      res.render("savedArticles", {
        article: dbArticle
      });
    })
    .catch(function (err) {
      console.log(err);
    });

});



//Close export
};
