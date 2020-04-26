var express = require("express");
const db = require("../db");

var router = express.Router();

router.get("/:id", (req, res) => {
  let id = req.params.id;
  let isBook = db
    .get("todo")
    .find({ id: id })
    .value();
  res.render("book/update", {
    id,
    title: isBook.title,
    description: isBook.description
  });
});

router.post("/:id/done", (req, res) => {
  let id = req.params.id;
  let title = req.body.title;
  let description = req.body.description;
  db.get("todo")
    .find({ id: id })
    .assign({ title, description })
    .write();
  res.redirect("/book");
});

module.exports = router;
