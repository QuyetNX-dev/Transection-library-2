var express = require("express");
var router = express.Router();
const shortid = require("shortid");

const db = require("../db");

router.get("/", (req, res) => {
  res.render("book/post", {});
});

router.post("/", (req, res) => {
  req.body.id = shortid.generate();
  req.body.stt = db.get("todo").value().length + 1;
  db.get("todo")
    .push(req.body)
    .write();
  res.redirect("/book");
});

module.exports = router;
