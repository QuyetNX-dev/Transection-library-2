var express = require("express");
var router = express.Router();

const db = require("../../db");

router.get("/:id", (req, res) => {
  let id = req.params.id;
  res.render("users/delete", {
    id
  });
});

router.get("/:id/oke", (req, res) => {
  var id = req.params.id;
  db.get("users")
    .remove({ id: id })
    .write();
  db.get("transection")
    .remove({ userId: id })
    .write();
  res.redirect("/users");
});

module.exports = router;
