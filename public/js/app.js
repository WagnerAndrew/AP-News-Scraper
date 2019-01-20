
// SAVE ARTICLE START////////////////////////////////////////////////////////////////////////////////////////////////
$(document).on("click", "#saveArticleBtn", function() {
    $.ajax({
      type: "GET",
      url: "/saveArticle/" + $(this).attr("data"),

      success: function(response) {
        console.log("Article saved!");
      }
    });
  });
// SAVE ARTICLE END////////////////////////////////////////////////////////////////////////////////////////////////


// DELETE ARTICLE START//////////////////////////////////////////////////////////////////////////////////////////////
$(document).on("click", "#deleteArticleBtn", function() {
  $.ajax({
    type: "GET",
    url: "/deleteArticle/" + $(this).attr("data"),

    success: function(response) {
      console.log("Article deleted!");
    }
  });
});
// DELETE ARTICLE END////////////////////////////////////////////////////////////////////////////////////////////////


// SAVE NOTE START////////////////////////////////////////////////////////////////////////////////////////////////
$(document).on("click", "#saveNoteBtn", function() {
  console.log("saveNoteBtn ID is: ", $(this).attr("data") );
  
  $.ajax({
    method: "POST",
    url: "/saveNote/" + $(this).attr("data"),
    data: {
      body: $("#noteBody").val()
    }
  })
    .then(function(data) {
      console.log(data);
      // Empty the notes section
      // $("#notes").empty();
    });

  // Also, remove the values entered in the input and textarea for note entry
  // $("#bodyinput").val("");
});

// SAVE NOTE END////////////////////////////////////////////////////////////////////////////////////////////////










// $("#scrapeBtn").on("click", function (){
//  $("#articlesDiv").empty();
// });
