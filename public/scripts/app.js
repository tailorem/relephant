/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(function() {

  function renderTweets(tweetData) {
    $('#tweets').empty();
    rTweets = tweetData.map(createTweetElement).reverse();
    // May need to remove .reverse()
    // console.log(tweetData);
    $('#tweets').append(rTweets);
  }

  function createTweetElement(tweet) {

    // console.log(tweet.user);

    var $tweet = $("<article>").addClass("tweet");

    var $header = $("<header>").appendTo($tweet);
    $("<img>").addClass("avatar").attr({src: tweet.user.avatars.small}).appendTo($header);
    $("<h3>").text(tweet.user.name).appendTo($header);
    $("<span>").text(tweet.user.handle).appendTo($header);

    $("<p>").text(tweet.content.text).appendTo($tweet);

    var $footer = $("<footer>").appendTo($tweet);
    $("<p>").text(moment(tweet.created_at).fromNow()).appendTo($footer);
    $('<p><i class="fab fa-font-awesome-flag"></i><i class="fas fa-retweet"></i><i class="fas fa-heart"></i></p>').addClass("icons").appendTo($footer);

    return $tweet;
  }

  function loadTweets() {
    $.ajax({
      method: "GET",
      url: "/tweets"
    })
    .done(function(tweets) {
      // console.log(tweets);
      renderTweets(tweets);
    });
  }

  $(".new-tweet form").on("submit", function(event) {
    event.preventDefault();

    var input = event.target.elements.text.value;

    $("#error").slideUp();

    if (input.length > 140) {
      event.preventDefault();

      $("#error").slideDown().text("Sorry, your tweet cannot exceed 140 characters.");
      // alert("Sorry, your tweet cannot exceed 140 characters.");
      return;
    }
    if (input.trim().length < 1) {
      event.preventDefault();
      $("#error").slideDown().text("Oops, you can't post a blank tweet.");
      // alert("Oops, you can't post a blank tweet.");
      return;
    }

    $.ajax({
      method: "POST",
      url: "/tweets",
      data: $(this).serialize()
    })
    .done(function() {
      console.log("am i here");
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

