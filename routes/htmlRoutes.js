var db = require("../models");

module.exports = function(app) {

// Load index page
app.get("/", function(req, res) {
    res.render("index")
});

app.get("/index", function(req, res) {
    res.render("index")
});

app.get("/savedArticles", function(req, res) {
    res.render("savedArticles")
});



//Close export
};
