const express = require("express");
const userrouter = require("./routes/user.route");
const postrouter = require("../src/routes/post.routes");
const cookie = require("cookie-parser");

const app = express();
app.use(express.json())
app.use(cookie());

app.use("/auth",userrouter);
app.use("/posts",postrouter);


module.exports = app;