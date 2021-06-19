//  index.js

const express = require("express");
const morgan = require("morgan");

const mongoose = require("mongoose");

require("./models/Product");

const app = express();
const port = process.env.PORT || 5000;

app.use(morgan("dev"));

app.use(express.json());
app.use(express.static("public"));

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

//IMPORT ROUTES
require("./routes/productRoutes")(app);

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));

  const path = require("path");
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

app.listen(port, () => {
  console.log("== Server is running on port", port);
});
