// jshint esversion: 6
// "use strict";

// Defines helper functions for saving and getting tweets, using the database "db"
module.exports = function makeDataHelpers(db) {
  return {

    saveUser: function(newUser, callback) {
      db.collection("users").insertOne(newUser, function(err, res) {
        callback(null);
      });
    },

    getUsers: function(callback) {
      const users = db.collection("users").find().toArray(function(err, users) {
        callback(null, users);
      });
    },

    // Saves a tweet to "db"
    saveTweet: function(newTweet, callback) {
      db.collection("tweets").insertOne(newTweet, function(err, res) {
        callback(null);
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

