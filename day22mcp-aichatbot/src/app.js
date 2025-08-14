const express = require("express");
const indexroute = require("./routes/index.route");


const app = express();

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static("public"))



app.use("/",indexroute);

module.exports = app;