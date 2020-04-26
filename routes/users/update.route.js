var express = require("express");
const db = require("../../db");

var router = express.Router();

router.get("/:id", (req, res) => {
  let id = req.params.id;
  let isBook = db
    .get("users")
    .find({ id: id })
    .value();
  res.render("users/update", {
    id,
    name: isBook.name
  });
});

router.post("/:id/done", (req, res) => {
  let id = req.params.id;
  let name = req.body.name;
  db.get("users")
    .find({ id: id })
    .assign({ name })
    .write();
  res.redirect("/users");
});

module.exports = router;
