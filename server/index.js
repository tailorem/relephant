// jshint esversion:6
// "use strict";

require("dotenv").config();

// Basic express setup:

const PORT          = process.env.PORT;
const cookieSession = require('cookie-session');
const bodyParser    = require("body-parser");
const express       = require("express");
const app           = express();


// require MongoDB
const {MongoClient} = require("mongodb");
// REFERENCE: above is alternative to const MongoClient = require("mongodb").MongoClient;
const MONGODB_URI = process.env.MONGODB_URI;

app.use(cookieSession({
  name: 'session',
  keys: [process.env.COOKIE_SESSION_KEYS],
  maxAge: 24 * 60 * 60 * 1000 // 24 hours
}));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

MongoClient.connect(MONGODB_URI, (err, db) => {
  if (err) {
    console.error(`Failed to connect: ${MONGODB_URI}`);
    throw err;
  }
  console.log(`Connected to mongodb: ${MONGODB_URI}`);

  const DataHelpers = require("./lib/data-helpers.js")(db);
  const dataRoutes = require("./routes/tweets")(DataHelpers);

  app.use("/", dataRoutes);

  app.listen(PORT, () => {
    console.log("Example app listening on port " + PORT);
  });

});

