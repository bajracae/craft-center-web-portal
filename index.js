//  index.js

const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

require("./models/Product");

const app = express();

mongoose.Promise = global.Promise;
// mongoose.connect(process.env.MONGODB_URI || `mongodb://localhost:27017/craft-center-web-portal`);
mongoose.connect(
  "mongodb://localhost:27017/craft-center",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err) => {
    if (err) console.error(err);
    else console.log("Connected to the mongodb");
  }
);

app.use(bodyParser.json());

//IMPORT ROUTES
require("./routes/productRoutes")(app);

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));

  const path = require("path");
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log("== Server is running on port", port);
});
