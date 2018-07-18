/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(function() {

  // Temporarily hard-coded tweet object for testing
  // Fake data taken from tweets.json
  // var data = [
  //   {
  //     "user": {
  //       "name": "Taylour",
  //       "avatars": {
  //         "small":   "/images/icon.jpg"
  //       },
  //       "handle": "@tailorem"
  //     },
  //     "content": {
  //       "text": "Something thoughtful should go here, but it won't."
  //     },
  //     "created_at": 1531928614954
  //   },
  //   {
  //     "user": {
  //       "name": "Newton",
  //       "avatars": {
  //         "small":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_50.png",
  //         "regular": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188.png",
  //         "large":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_200.png"
  //       },
  //       "handle": "@SirIsaac"
  //     },
  //     "content": {
  //       "text": "If I have seen further it is by standing on the shoulders of giants"
  //     },
  //     "created_at": 1461116232227
  //   }
  // ];

  function renderTweets(tweetData) {
    // May need to remove .reverse()
    $('#tweets').append(tweetData.map(createTweetElement).reverse());
  }

  function createTweetElement(tweet) {
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

  $(".new-tweet form").on("submit", function(event) {
    event.preventDefault();

    $.ajax({
      method: "POST",
      url: "/tweets",
      data: $(this).serialize()
    });

    console.log(event.target.elements.text.value);
    event.target.elements.text.value = "";
    console.log($(this).serialize());
  });

  function loadTweets() {
    $.ajax({
      method: "GET",
      url: "/tweets",
    })
    .done(function(tweets) {
      renderTweets(tweets);
    });
  }

  loadTweets();

  // renderTweets(data);
});

