const eslint = require("express").Router();
const { ESLint } = require("eslint");
const { createStats } = require("../queries/userStats");

eslint.get("/", (req, res) => {
  res.json({ result: "Please use POST method to get a result" });
});

eslint.post("/", async (req, res) => {
  const lint = new ESLint();
  const result = await lint.lintText(req.body.input);
  result[0].messages.forEach((elem) => {
    let dd = new Date().getDate() + "" + "/";
    let mm = new Date().getMonth() + 1 + "" + "/";
    let yyyy = new Date().getFullYear() + "";
    elem.date = mm + dd + yyyy;
  });
  await createStats(result[0].messages);
  res.json({ result });
});

eslint.post("/fix", async (req, res) => {
  const lint = new ESLint({ fix: true });
  const fixedResult = await lint.lintText(req.body.input);
  res.json({ fixedResult });
});

module.exports = eslint;
