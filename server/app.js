const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

if (process.env.NODE_ENV === "production") {
  app.use(express.static("../client/build"));
}

//mongoose connection, need to add database name
mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost:27017/event-finder",

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

module.exports = { app };