var axios = require("axios");
var cheerio = require("cheerio");
var db = require("../models");

module.exports = function (app) {

  // SCRAPE START//////////////////////////////////////////////////////////////////////////////////////////////////////
  app.get("/scrape", function (req, res) {

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

      db.Article.find({})
        .then(function (dbArticle) {
          res.render("index", {
            article: dbArticle
          });
        })
        .catch(function (err) {
          console.log(err);
        });
    });
  });
  // SCRAPE END//////////////////////////////////////////////////////////////////////////////////////////////////////


  // SAVE ARTICLE START//////////////////////////////////////////////////////////////////////////////////////////////
  app.get("/saveArticle/:id", function (req, res) {

    db.Article.update(req.body)
      .then(function (dbArticle) {
        return db.Article.findOneAndUpdate({ _id: req.params.id }, { $set: { saved: true } });
      })
      .then(function (dbArticle) {
        res.json(dbArticle);
      })
      .catch(function (err) {
        res.json(err);
      });
  });
  // SAVE ARTICLE END////////////////////////////////////////////////////////////////////////////////////////////////


  // DELETE ARTICLE START//////////////////////////////////////////////////////////////////////////////////////////////
  app.get("/deleteArticle/:id", function (req, res) {

    db.Article.update(req.body)
      .then(function (dbArticle) {
        return db.Article.findOneAndUpdate({ _id: req.params.id }, { $set: { saved: false } });
      })
      .then(function (dbArticle) {
        res.json(dbArticle);

      })
      .catch(function (err) {
        res.json(err);
      });
  });
  // DELETE ARTICLE END////////////////////////////////////////////////////////////////////////////////////////////////


  // NOTE POST START//////////////////////////////////////////////////////////////////////////////////////////////
  app.post("/saveNote/:id", function (req, res) {

    var newNote = {
      articleID: req.params.id,
      body: req.body.note
    };

    db.Note.create(newNote)
      .then(function (dbNote) {
        console.log("dbNote is: ", dbNote);
        res.json(dbNote);
      })
      .catch(function (err) {
        res.json(err);
      });
  });
  // NOTE POST END////////////////////////////////////////////////////////////////////////////////////////////////


  // NOTES GATHER END////////////////////////////////////////////////////////////////////////////////////////////////
  app.get("/notes/:id", function (req, res) {
    db.Note.find({ articleID: req.params.id })
      .then(function (dbNote) {
        res.json(dbNote)
      })
      .catch(function (err) {
        res.json(err);
      });
  });
  // NOTES GATHER END////////////////////////////////////////////////////////////////////////////////////////////////


  // DELETE ARTICLE START//////////////////////////////////////////////////////////////////////////////////////////////
  app.get("/deleteNote/:id", function (req, res) {

    db.Note.remove({ _id: req.params.id })
      .then(function (dbNote) {

        res.json(dbNote);

      })
      .catch(function (err) {
        res.json(err);
      });
  });
  // DELETE ARTICLE END////////////////////////////////////////////////////////////////////////////////////////////////


  //Close Exports
};
