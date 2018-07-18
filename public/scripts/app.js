/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// Temporarily hard-coded tweet object for testing
var tweetData = {
    "user": {
      "name": "Newton",
      "avatars": {
        "small":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_50.png",
        "regular": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188.png",
        "large":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_200.png"
      },
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  };


function createTweetElement(tweetData) {
  // var $newTweet = tweetData;
  var $article = $("<article>").addClass("tweet");
  var icons ='<i class="fab fa-font-awesome-flag"></i><i class="fas fa-retweet"></i><i class="fas fa-heart"></i>';

  $article.append('<header><img class="avatar" src="' + tweetData.user.avatars.small + '" /><h3>' + tweetData.user.name + '</h3><span>' + tweetData.user.handle)
  .append("<p>" + tweetData.content.text + "</p>")
  .append('<footer><p>' + tweetData.created_at + '</p><p class="icons">' + icons + '</p>');

  // .append("<h3>" + tweetData.user.name + "</h3>");

  // $('article').append('<header>' + tweetData.user.name + '</header>');
  // console.log($article[0]);
  return $article[0];
}

var $tweet = createTweetElement(tweetData);

// // Test / driver code (temporary)

$( document ).ready(function() {
  // console.log($tweet);
  $('#tweets').append($tweet);
});

