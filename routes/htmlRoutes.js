var axios = require("axios");
var cheerio = require("cheerio");
var db = require("../models");

module.exports = function (app) {

  // Load index page
  app.get("/", function (req, res) {

    db.Article.remove({})
      .then(function (dbArticle) {

        db.Note.remove({})
          .then(function (dbNote) {
            res.render("index")
          })
          .catch(function (err) {
            console.log(err);
          });
      })
      .catch(function (err) {
        console.log(err);
      });

    axios.get("https://www.apnews.com/apf-topnews").then(function (response) {

      var $ = cheerio.load(response.data);

      $("div.FeedCard").each(function (i, element) {

        var article = {};

        article.title = $(element).find("div.CardHeadline").find("a.headline").find("h1").text();
        article.summary = $(element).find("a.content-container").find("div.content").find("p").text();
        article.link = $(element).find("div.CardHeadline").find("a.headline").attr("href");

        db.Article.create(article)
          .then(function (dbArticle) {
          })
          .catch(function (err) {
            console.log(err);
          });
      });
    });

  });

  // // Load index page
  // app.get("/", function (req, res) {
  //   res.render("index")
  // });

  // Load index page
  app.get("/index", function (req, res) {
    res.render("index")
  });

  // Load saved articles
  app.get("/savedArticles", function (req, res) {

    db.Article.find({ saved: true })
      .then(function (dbArticle) {

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
