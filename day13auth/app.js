const express = require("express");
const authroutes = require("./src/routes/auth.route");

const app = express();
app.use(express.json());

app.use("/auth",authroutes);




module.exports = app;