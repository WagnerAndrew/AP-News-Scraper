var axios = require("axios");
var cheerio = require("cheerio");


var db = require("../models");

module.exports = function (app) {


  app.get("/scrape", function (req, res) {
    db.Article.deleteMany({})
            // .then(function (dbArticle) {
            //   // View the added result in the console
            //   console.log("dbArticle dropped: ", dbArticle);
            // })
            // .catch(function (err) {
            //   // If an error occurred, log it
            //   console.log(err);
            // });

    axios.get("https://www.apnews.com/apf-topnews").then(function (response) {
      
      var $ = cheerio.load(response.data);

      $("div.FeedCard").each(function (i, element) {

        var article = {};

        // var imgLink = $(element).find("a").find("img").attr("data-srcset").split(",")[0].split(" ")[0];

        article.title = $(element)
          .find("div.CardHeadline")
          .find("a.headline")
          .find("h1")
          .text();


        article.summary = $(element)
          .find("a.content-container")
          .find("div.content")
          .find("p")
          .text();

        article.link = $(element)
          .find("div.CardHeadline")
          .find("a.headline")
          .attr("href");
          

        console.log("Article looks like this: ", article);

        db.Article.create(article)
          .then(function (dbArticle) {
            // View the added result in the console
            console.log("dbArticle.create: ", dbArticle);
          })
          .catch(function (err) {
            // If an error occurred, log it
            console.log(err);
          });
      });


      db.Article.find({})
        .then(function (dbArticle) {
          // If we were able to successfully find Articles, send them back to the client
          console.log("dbArticle is: ", dbArticle);

          // $("#articlesDiv").empty();
          res.render("index", {
            article: dbArticle
          });
        })
        .catch(function (err) {
          // If an error occurred, send it to the client
          // res.json(err);
          console.log(err);

        });

    });
  });


  app.get("/articles", function (req, res) {
    // Grab every document in the Articles collection
    db.Article.find({})
      .then(function (dbArticle) {
        // If we were able to successfully find Articles, send them back to the client
        res.json(dbArticle);
      })
      .catch(function (err) {
        // If an error occurred, send it to the client
        res.json(err);
      });
  });

  //Close Exports
};








  // app.get("/scrape", function(req, res) {
  //   // First, we grab the body of the html with axios
  //   axios.get("http://www.echojs.com/").then(function(response) {
  //     // Then, we load that into cheerio and save it to $ for a shorthand selector
  //     var $ = cheerio.load(response.data);

  //     // Now, we grab every h2 within an article tag, and do the following:
  //     $("article h2").each(function(i, element) {
  //       // Save an empty result object
  //       var article = {};

  //       // Add the text and href of every link, and save them as properties of the result object
  //       article.title = $(this)
  //         .children("a")
  //         .text();
  //       article.summary = $(this)
  //         .children("a")
  //         .text()
  //       article.link = $(this)
  //         .children("a")
  //         .attr("href");

  //       // Create a new Article using the `result` object built from scraping
  //       db.Article.create(article)
  //         .then(function(dbArticle) {
  //           // View the added result in the console
  //           console.log(dbArticle);
  //         })
  //         .catch(function(err) {
  //           // If an error occurred, log it
  //           console.log(err);
  //         });
  //     });

  //     // Grab every document in the Articles collection
  //     db.Article.find({})
  //       .then(function (dbArticle) {
  //         // If we were able to successfully find Articles, send them back to the client

  //         $("#articlesDiv").empty();
  //         res.render("index", {
  //           article: dbArticle
  //         });
  //       })
  //       .catch(function (err) {
  //         // If an error occurred, send it to the client
  //         res.json(err);
  //       });

  //   });
  // });






