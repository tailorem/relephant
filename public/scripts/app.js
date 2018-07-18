/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// Temporarily hard-coded tweet object for testing
// Fake data taken from tweets.json
var data = [
  {
    "user": {
      "name": "Taylour",
      "avatars": {
        "small":   "/images/icon.jpg"
      },
      "handle": "@tailorem"
    },
    "content": {
      "text": "Something thoughtful should go here, but it won't."
    },
    "created_at": "X moment in time"
  },
  {
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
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": {
        "small":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_50.png",
        "regular": "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc.png",
        "large":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_200.png"
      },
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  },
  {
    "user": {
      "name": "Johann von Goethe",
      "avatars": {
        "small":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_50.png",
        "regular": "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1.png",
        "large":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_200.png"
      },
      "handle": "@johann49"
    },
    "content": {
      "text": "Es ist nichts schrecklicher als eine tätige Unwissenheit."
    },
    "created_at": 1461113796368
  }
];

function renderTweets(tweets) {
  // loops through tweets
  for (var index in data) {
    // calls createTweetElement for each tweet
    // takes return value and appends it to the tweets container
    var $tweet = createTweetElement(data[index]);
    $('#tweets').append($tweet);
  }
  // NOTE TO SELF: USE MOMENT TO RENDER TIMESTAMPS
}


function createTweetElement(tweet) {
  var $tweet = $("<article>").addClass("tweet");
  var icons ='<i class="fab fa-font-awesome-flag"></i><i class="fas fa-retweet"></i><i class="fas fa-heart"></i>';

  $tweet.append('<header><img class="avatar" src="' + tweet.user.avatars.small + '" /><h3>' + tweet.user.name + '</h3><span>' + tweet.user.handle)
  .append("<p>" + tweet.content.text + "</p>")
  .append('<footer><p>' + tweet.created_at + '</p><p class="icons">' + icons + '</p>');

  return $tweet;
}


$( document ).ready(function() {
  renderTweets(data);
});

