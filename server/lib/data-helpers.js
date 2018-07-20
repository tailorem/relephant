// jshint esversion: 6
// "use strict";

// Defines helper functions for saving and getting tweets, using the database "db"
module.exports = function makeDataHelpers(db) {
  return {

    // Saves a tweet to "db"
    saveTweet: function(newTweet, callback) {
      db.collection("tweets").insertOne(newTweet, function(err, res) {
        callback(null, true);
      });
    },

    // Get all tweets in "db", sorted by newest first
    getTweets: function(callback) {
      db.collection("tweets").find().toArray(function(err, tweets) {
        const sortNewestFirst = (a, b) => a.created_at - b.created_at;
        callback(null, tweets.sort(sortNewestFirst));

      });
    } //get finishes here.
  };
};

