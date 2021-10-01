const eslint = require("express").Router();
const { ESLint } = require("eslint");
const { createStats } = require("../queries/userStats");

eslint.get("/", (req, res) => {
  res.json({ result: "Please use POST method to get a result" });
});

eslint.post("/", async (req, res) => {
  console.log("POST STARTED")
  const lint = new ESLint();
  const result = await lint.lintText(req.body.input);
  console.log("FINISH AWAIT LINT LINE12", result)
  if (result[0].messages.length > 0) {
    console.log("HERE line 14")
    if (result[0].messages[0].fatal) {
      res.json({ result });
    } else {
      console.log("LINE 18")
      result[0].messages.forEach((elem) => {
        elem.source_code = req.body.input;
      });
      console.log("LINE 22")
      await createStats(result[0].messages);
      console.log("LINE 25")
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
