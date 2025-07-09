const express = require("express");
const app = express(); //server create hogya

app.use(express.json());

let users = [
  { id: 1, name: "Jitu" },
  { id: 2, name: "Aman" },
];
app.get("/home", (req, res) => {
  res.send("welcome home page");
});
app.get("/", (req, res) => {
  res.send("welcome first page");
});
app.get("/user", (req, res) => {
  res.json(users);
});

app.listen(3000, () => {
  console.log("server is run on port 3000"); // server start ho gya
});
