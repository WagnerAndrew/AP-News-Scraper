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

        // console.log("Article looks like this: ", article);

        db.Article.create(article)
          .then(function (dbArticle) {
            // console.log("Articles created: ", dbArticle);
          })
          .catch(function (err) {
            console.log(err);
          });
      });

      db.Article.find({})
        .then(function (dbArticle) {
          // console.log("dbArticle is: ", dbArticle);

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

    // console.log("req.params is: ", req.params.id );

    db.Article.update(req.body)
      .then(function (dbArticle) {
        return db.Article.findOneAndUpdate({ _id: req.params.id }, { $set: { saved: true } });
      })
      .then(function (dbArticle) {
        // If we were able to successfully update an Article, send it back to the client
        res.json(dbArticle);
      })
      .catch(function (err) {
        // If an error occurred, send it to the client
        res.json(err);
      });
  });
// SAVE ARTICLE END////////////////////////////////////////////////////////////////////////////////////////////////


// DELETE ARTICLE START//////////////////////////////////////////////////////////////////////////////////////////////
app.get("/deleteArticle/:id", function (req, res) {

  // console.log("req.params is: ", req.params.id );

  db.Article.update(req.body)
    .then(function (dbArticle) {
      return db.Article.findOneAndUpdate({ _id: req.params.id }, { $set: { saved: false } });
    })
    .then(function (dbArticle) {
      // If we were able to successfully update an Article, send it back to the client
      // res.json(dbArticle);
      res.redirect('/savedArticles');
      
    })
    .catch(function (err) {
      // If an error occurred, send it to the client
      res.json(err);
    });

    // res.redirect('/savedArticles');
});
// DELETE ARTICLE END////////////////////////////////////////////////////////////////////////////////////////////////



// NOTE START//////////////////////////////////////////////////////////////////////////////////////////////
app.post("/saveNote/:id", function(req, res) {
  console.log("Note req.body Note is: ", req.body);
  console.log("Note req.params.data is: ", req.params.data)
  console.log("Note req.params.body is: ", req.params.body)
  
  db.Note.create(req.body)


    .then(function(dbNote) {
      // If a Note was created successfully, find one Article with an `_id` equal to `req.params.id`. Update the Article to be associated with the new Note
      // { new: true } tells the query that we want it to return the updated User -- it returns the original by default
      // Since our mongoose query returns a promise, we can chain another `.then` which receives the result of the query
      return db.Article.findOneAndUpdate({ _id: req.params.data }, { note: req.params.data }, { new: true });
    })
    .then(function(dbArticle) {
      // If we were able to successfully update an Article, send it back to the client
      res.json(dbArticle);
    })
    .catch(function(err) {
      // If an error occurred, send it to the client
      res.json(err);
    });
});
// NOTE END////////////////////////////////////////////////////////////////////////////////////////////////


  //Close Exports
};












// // DELETE ARTICLE START//////////////////////////////////////////////////////////////////////////////////////////////
// app.get("/deleteArticle/:id", function (req, res) {

//   console.log("req.params is: ", req.params.id );

//   db.Article.update(req.body)
//     .then(function (dbArticle) {
//       return db.Article.findOneAndUpdate({ _id: req.params.id }, { $set: { saved: false } });
//     })
//     .then(function (dbArticle) {
//       // If we were able to successfully update an Article, send it back to the client
//       // res.json(dbArticle);

//       db.Article.find({ saved: true })
//       .then(function (dbArticle) {
//         // console.log("dbArticle is: ", dbArticle);

//         res.render("index", {
//           article: dbArticle
//         });
//       })
//       .catch(function (err) {
//         console.log(err);
//       });
  


//       res.render("savedArticles", {
//         article: dbArticle
//       });
//     })
//     .catch(function (err) {
//       // If an error occurred, send it to the client
//       res.json(err);
//     });
// });
// // DELETE ARTICLE END////////////////////////////////////////////////////////////////////////////////////////////////



// app.get("/articles", function (req, res) {
//   // Grab every document in the Articles collection
//   db.Article.find({})
//     .then(function (dbArticle) {
//       // If we were able to successfully find Articles, send them back to the client
//       res.json(dbArticle);
//     })
//     .catch(function (err) {
//       // If an error occurred, send it to the client
//       res.json(err);
//     });
// });