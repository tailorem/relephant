// All functions called in this file are defined in helpers.js
$(function() {

  $("#register form").submit(function(event) {
    event.preventDefault();

    console.log($(this).serialize());

    $.ajax({
      method: "POST",
      url: "/register",
      data: $(this).serialize()
    })
    .done(function() {
      $("#register input").val("");
    });

  });


  $(".new-tweet form").submit(function(event) {
    event.preventDefault();

    var input = event.target.elements.text.value;

    if (input.length > 140) {
      swapError($("#error"), "Oops, that trumpet was too loud.");
      return;
    }
    if (input.trim().length < 1) {
      swapError($("#error"), "Oops, that trumpet wasn't loud enough.");
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
