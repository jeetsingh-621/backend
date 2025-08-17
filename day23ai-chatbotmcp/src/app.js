require("dotenv").config();
const express = require("express");
const authroute  = require("./routes/auth.route");
const cookieparser = require("cookie-parser");
const homeroute = require("../src/routes/Home.route");



const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.set("view engine","ejs");
app.use(express.static("public"))
app.use(cookieparser());


app.use("/auth",authroute);
app.use("/",homeroute);


module.exports = app;


