var db = require("../models");

module.exports = function(app) {

// Load index page
app.get("/", function(req, res) {
    res.render("index")
});

};














    
// // Load index page
// app.get("/", function(req, res) {
//     res.render("index")
// });

// app.get("/", function(req, res) {
//     db.Article.findAll({}).then(function(dbArticle) {
//       console.log("Article",dbArticle);
//       res.render("index", {
//         article: dbArticle
//       });
//     });
//   });


// // Load Saved Articles page
// app.get("/savedArticles", function(req, res) {
//     res.render("savedArticles")
// });
