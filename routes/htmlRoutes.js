
module.exports = function(app) {
// Load index page
app.get("/", function(req, res) {
    res.render("index")
});

// Load index page
app.get("/index", function(req, res) {
    res.render("index")
});

// Load Saved Articles page
app.get("/savedArticles", function(req, res) {
    res.render("savedArticles")
});

};
