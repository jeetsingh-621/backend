const express = require("express");
const userrouter = require("./src/routes/user.auth");
const cookie = require("cookie-parser");


const app = express();
app.use(cookie());
app.use(express.json());
app.use("/auth",userrouter);


module.exports = app;