// DEPENDENCIES
const cors = require("cors");
const express = require("express");
const inputController = require("./Controllers/inputController");
const eslintController = require("./Controllers/eslintController");
const { ESLint } = require("eslint");

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
app.use("/code", inputController);

// 404 Page
app.get("*", (req, res) => {
  res.status(404).send("Page not found");
});

// Lint Test

let str = "() => {    const yes = 0      }";

const linter = async () => {
  const eslint = new ESLint();
  const results = await eslint.lintText(str);
  console.log(results[0].messages);
};

linter();

// EXPORT
module.exports = app;
