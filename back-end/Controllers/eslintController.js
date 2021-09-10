const eslint = require("express").Router();
const { ESLint } = require("eslint");

eslint.post("/", async (req, res) => {
    console.log("BODY", req.body)
    const lint = new ESLint();
    const result = await lint.lintText(req.body.input);
    res.json({ result });
})

module.exports = eslint;
