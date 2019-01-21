
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
  
  var notesID = $(this).attr("data");

  $.ajax({
    method: "POST",
    url: "/saveNote/" + $(this).attr("data"),
    data: {
      note: $("#noteBody"+notesID).val()
    }
  })
    .then(function(data) {
      // console.log("Response from note post is: ", data);
      var newNote = (`<div class="card horizontal"><div class="card-content"><h5>${data.body}</h5><button data="${data._id}" id="deleteNoteBtn" class="btn-small red white-text waves-effect waves-light">Delete Note</button></div></div>`)

      $("#noteBody"+notesID).val("");
      $("#notes"+notesID).append(newNote);
    });    

});
// SAVE NOTE END////////////////////////////////////////////////////////////////////////////////////////////////



// GET NOTE START////////////////////////////////////////////////////////////////////////////////////////////////
$(document).on("click", "#addNoteBtn", function(event) {
  event.preventDefault();

  var notesID = $(this).attr("data");

  $.ajax({
    type: "GET",
    url: "/notes/" + $(this).attr("data")
  })
  .then(function(data) {
    // console.log("Response from note post is: ", data);
    $("#notes"+notesID).empty();

    for (var i = 0; i < data.length; i++) {

      $("#notes"+notesID).append(`<div class="card horizontal"><div class="card-content"><h5>${data[i].body}</h5><button data="${data[i]._id}" id="deleteNoteBtn" class="btn-small red white-text waves-effect waves-light">Delete Note</button></div></div>`)

    }
  });    

});
// GET NOTE END////////////////////////////////////////////////////////////////////////////////////////////////



// DELETE ARTICLE START//////////////////////////////////////////////////////////////////////////////////////////////
$(document).on("click", "#deleteNoteBtn", function() {
  $.ajax({
    type: "GET",
    url: "/deleteNote/" + $(this).attr("data"),

    success: function(response) {
      console.log("Note deleted!");
    }
  // })
  // .then(function(data) {
  //   console.log(data);
    // location.reload();
  });

});
// DELETE ARTICLE END////////////////////////////////////////////////////////////////////////////////////////////////

// $(document).on("click", "#closeBtn", function(event) {
//   event.preventDefault();
//   location.reload();
// });

// $("#scrapeBtn").on("click", function (){
//  $("#articlesDiv").empty();
// });
