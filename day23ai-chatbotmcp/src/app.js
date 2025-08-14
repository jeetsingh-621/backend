require("dotenv").config();
const express = require("express");
const authroute  = require("./routes/auth.route");
const cookieparser = require("cookie-parser");



const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.set("view engine","ejs");
app.use(express.static("public"))
app.use(cookieparser());


app.use("/auth",authroute);


module.exports = app;


