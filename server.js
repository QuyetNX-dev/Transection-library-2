const express = require("express");
const PORT = process.env.PORT || 8080;
const shortid = require("shortid");

const db = require("./db");
const updateRoute = require("./routes/update.route");
const deleteRoute = require("./routes/delete.route");
const postRoute = require("./routes/post.route");

const updateUserRoute = require("./routes/users/update.route");
const deleteUserRoute = require("./routes/users/delete.route");
const postUserRoute = require("./routes/users/post.route");

const transectionRoute = require("./routes/transection/index.route");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "pug");
app.set("views", "./views");

// const transection = [];
app.get("/", (req, res) => {
  res.render("myFibrary");
});

app.get("/book", (req, res) => {
  db.get("todo")
    .forEach((item, index) => {
      item.stt = index + 1;
    })
    .write();
  res.render("book/index", {
    todos: db.get("todo").value()
  });
});

app.get("/users", (req, res) => {
  db.get("users")
    .forEach((item, index) => {
      item.stt = index + 1;
    })
    .write();
  res.render("users/index", {
    users: db.get("users").value()
  });
});

app.use("/transection", transectionRoute);

app.use("/book/update", updateRoute);
app.use("/book/delete", deleteRoute);
app.use("/book/post", postRoute);

app.use("/users/update", updateUserRoute);
app.use("/users/delete", deleteUserRoute);
app.use("/users/post", postUserRoute);

app.listen(PORT, () => {
  console.log("Service running on PORT:" + PORT);
});
