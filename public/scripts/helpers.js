// Creates an animation for a 'swap' between old and new errors
function swapError(wrapper, newError) {
  if (wrapper.text() === newError) {
    return;
  } else {
    wrapper.slideUp(function() {
      wrapper.text(newError).slideDown();
    });
  }
}

// Creates an HTML DOM structure for a tweet object
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

// Takes in tweet data and creates a 'tweet element' for each tweet
function renderTweets(tweetData) {
  $('#tweets').empty();
  rTweets = tweetData.map(createTweetElement).reverse();
  $('#tweets').append(rTweets);
}

// Loads all tweets stored in the database
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