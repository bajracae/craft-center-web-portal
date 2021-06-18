//  index.js

const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const app = express();

mongoose.Promise = global.Promise;
// mongoose.connect(process.env.MONGODB_URI || `mongodb://localhost:27017/craft-center-web-portal`);
mongoose.connect("mongodb://localhost:27017/craft-center", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(bodyParser.json());

const port = process.env.port || 5000;
app.listen(port, () => {
  console.log("== Server is running on port", port);
});
