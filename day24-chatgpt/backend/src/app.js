const express = require("express");
const cookieparser = require("cookie-parser");
const cors = require("cors");

const app = express();

const userroutes = require("../src/routes/auth.route");
const chatroutes = require("../src/routes/chat.route");
//middleware
app.use(express.json());
app.use(cookieparser());
app.use(cors({
    origin:'http://localhost:5173',
    credentials:true,

}));

//routes
app.use("/api/auth", userroutes);
app.use("/api/chat", chatroutes);

module.exports = app;
