// DEPENDENCIES
const cors = require("cors");
const express = require("express");
const eslintController = require("./Controllers/eslintController");

// CONFIGURATION
const app = express();

// MIDDLEWARE
app.use(cors());
app.use(express.json()); // Parse incoming JSON

// ROUTES
app.get("/", (req, res) => {
  res.send("Welcome to the Code Clearly back-end.");
});

app.use("/eslint", eslintController);

// 404 Page
app.get("*", (req, res) => {
  res.status(404).send("Page not found");
});

// EXPORT
module.exports = app;
