const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

if (process.env.NODE_ENV === "production") {
  app.use(express.static("../client/build"));
}

//mongoose connection, need to add database name
mongoose.connect(
  process.env.MONGODB_URI ||
    "mongodb://user:password1@ds343127.mlab.com:43127/heroku_r3v7v5wc",

  { useCreateIndex: true, useFindAndModify: false, useNewUrlParser: true }
);

// Init Middleware
app.use(express.json({ extended: false }));

//Define Routes
app.use("/api/users", require("./routes/users"));
app.use("/api/auth", require("./routes/auth"));
app.use("/api/events", require("./routes/events"));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/build/index.html"));
});

app.listen(PORT, () => {
  console.log(`API server now on PORT ${PORT}!`);
});
