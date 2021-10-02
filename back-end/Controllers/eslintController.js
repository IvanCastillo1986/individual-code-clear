const eslint = require("express").Router();
const { ESLint } = require("eslint");
const { createStats } = require("../queries/userStats");

eslint.get("/", (req, res) => {
  res.json({ result: "Please use POST method to get a result" });
});

eslint.post("/", async (req, res) => {
  const lint = new ESLint();
  const result = await lint.lintText(req.body.input);
  if (result[0].messages.length > 0) {
    if (result[0].messages[0].fatal) {
      res.json({ result });
    } else {
      result[0].messages.forEach((elem) => {
        elem.source_code = req.body.input;
      });
      await createStats(result[0].messages);
      res.json({ result });
    }
  } else {
    res.json({ result });
  }
});

eslint.post("/fix", async (req, res) => {
  const lint = new ESLint({ fix: true });
  const fixedResult = await lint.lintText(req.body.input);
  res.json({ fixedResult });
});

module.exports = eslint;
