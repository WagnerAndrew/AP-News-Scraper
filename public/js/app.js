
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
  })
  .then(function(data) {
    console.log(data);
    location.reload();
  });

});
// DELETE ARTICLE END////////////////////////////////////////////////////////////////////////////////////////////////


// SAVE NOTE START////////////////////////////////////////////////////////////////////////////////////////////////
$(document).on("click", "#saveNoteBtn", function(event) {
  event.preventDefault();
  // console.log("saveNoteBtn ID is: ", $(this).attr("data") );
  
  $.ajax({
    method: "POST",
    url: "/saveNote/" + $(this).attr("data"),
    data: {
      note: $("#noteBody").val()
    }
  })
    .then(function(data) {
      console.log("Response from note post is: ",data);
      
    });
  
});
// SAVE NOTE END////////////////////////////////////////////////////////////////////////////////////////////////










// $("#scrapeBtn").on("click", function (){
//  $("#articlesDiv").empty();
// });
