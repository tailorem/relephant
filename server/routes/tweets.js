// jshint esversion: 6
"use strict";

const md5 = require('md5');
const bcrypt = require("bcrypt");
const userHelper    = require("../lib/util/user-helper")

const express       = require('express');
const tweetsRoutes  = express.Router();

module.exports = function(DataHelpers) {

  tweetsRoutes.get("/tweets", function(req, res) {
    DataHelpers.getTweets((err, tweets) => {
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        res.json(tweets);
      }
    });
  });

  tweetsRoutes.post("/tweets", function(req, res) {
    if (!req.body.text) {
      res.status(400).json({ error: 'invalid request: no data in POST body'});
      return;
    }

    const user_id = req.session.user_id;
    const tweet = {
      user_id: user_id,
      content: req.body.text,
      created_at: Date.now()
    };
    DataHelpers.saveTweet(tweet, (err) => {
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        res.status(201).send();
      }
    });
  });

  tweetsRoutes.post("/register", function(req, res) {
    let user_id = Math.random().toString(36).substr(2, 6);
    req.session.user_id = user_id;
    const user = {
      "user_id": user_id,
      "username": req.body.username,
      "password": bcrypt.hashSync(req.body.password, 12),
      "avatar": "https://vanillicon.com/" + md5(user_id) + "_50.png",
      "display_name": req.body.display_name
    };

    DataHelpers.saveUser(user, (err) => {
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        res.json(user);
      }
    });
  });

  tweetsRoutes.get("/users", function(req, res) {
    DataHelpers.getUsers((err, users) => {
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        console.log(users);
        res.json(users);
      }
    });
  });


  return tweetsRoutes;

};

