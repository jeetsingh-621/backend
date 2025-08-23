const express = require("express");
const cookieparser = require("cookie-parser");
const app = express();
const userroutes = require("../src/routes/auth.route");
const chatroutes = require("./routes/chat.route");
//middleware
app.use(express.json());
app.use(cookieparser());

//routes
app.use("/api/auth",userroutes);
app.use("/api/chat",chatroutes);


module.exports = app;