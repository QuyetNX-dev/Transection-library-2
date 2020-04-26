var express = require("express");
var router = express.Router();
const shortid = require("shortid");

const db = require("../../db");

router.get("/", (req, res) => {
  res.render("users/post", {});
});

router.post("/", (req, res) => {
  req.body.stt = db.get("users").value().length + 1;
  req.body.id = shortid.generate();
  db.get("users")
    .push(req.body)
    .write();
  res.redirect("/users");
});

module.exports = router;
