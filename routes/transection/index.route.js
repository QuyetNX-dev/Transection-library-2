const express = require("express");
const router = express.Router();
const shortid = require("shortid");
const db = require("../../db");

router.get("/", (req, res) => {
  db.get("transection").forEach(item => {
    item.stt = db.get("transection").value().length + 1;
  });
  var collectionTransection = db
    .get("transection")
    .value()
    .map((item, index) => {
      let bookTransection = db
        .get("todo")
        .value()
        .find(itemBook => {
          return itemBook.id === item.bookId;
        });
      let userTransection = db
        .get("users")
        .value()
        .find(itemUser => {
          return itemUser.id === item.userId;
        });

      let obj = {
        stt: index + 1,
        id: item.id,
        title: [bookTransection.title],
        name: userTransection.name
      };
      return obj;
    });
  res.render("transection/index", {
    collectionTransection
  });
});

router.get("/delete/:id", (req, res) => {
  var id = req.params.id;
  db.get("transection")
    .remove({ id: id })
    .write();
  res.redirect("back");
});

router.get("/create", (req, res) => {
  res.render("transection/create", {
    users: db.get("users").value(),
    books: db.get("todo").value()
  });
});

router.post("/create", (req, res) => {
  req.body.id = shortid.generate();
  req.body.stt = db.get("transection").value().length + 1;
  db.get("transection")
    .push(req.body)
    .write();
  res.redirect("/transection");
});

module.exports = router;
