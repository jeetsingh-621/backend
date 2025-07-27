const express = require("express");
const userroute = require("./src/routes/user.route");
const cokkieparser = require("cookie-parser");



const app = express();
app.use(express.json()) //middleware to read data req.body in raw format;
app.use(cokkieparser())


app.use("/auth",userroute);



module.exports = app;