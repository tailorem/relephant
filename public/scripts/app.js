/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// all functions called here are defined in helpers.js

$(function() {

  $(".new-tweet form").on("submit", function(event) {
    event.preventDefault();

    var input = event.target.elements.text.value;

    if (input.length > 140) {
      swapError($("#error"), "Sorry, your tweet cannot exceed 140 characters.");
      return;
    }
    if (input.trim().length < 1) {
      swapError($("#error"), "Oops, you can't post a blank tweet.");
      return;
    }
    if ($("#error").text()) {
      $("#error").slideUp();
    }

    $.ajax({
      method: "POST",
      url: "/tweets",
      data: $(this).serialize()
    })
    .done(function() {
      loadTweets();
    });

    event.target.elements.text.value = "";
    $("span.counter").text(140);
    // console.log($(this).serialize());

  });

  loadTweets();

  $("#compose").on("click", function() {
    $("section.new-tweet").slideToggle(300, function() {
      $(".new-tweet textarea").focus();
    });
  });

  // renderTweets(data);
});


// NOTE TO SELF:
    // Practice/review lexical scope, this, .bind()
    // console.log(this);
    // function test() {
    //   console.log("Test output, don't forget to delete me.");
    //   console.log(this);
    //   console.log($(this));
    //   return;
    // }
    // test();
