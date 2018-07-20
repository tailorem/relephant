// All functions called in this file are defined in helpers.js
$(function() {

  $(".new-tweet form").submit(function(event) {
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

  });

  loadTweets();

  $("#compose").on("click", function() {
    $("section.new-tweet").slideToggle(400, function() {
      $(".new-tweet textarea").focus();
    });
  });

});
