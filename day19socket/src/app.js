const express = require("express");

const app = express();


app.get("/",(req,res)=>{
    res.send("hllo world");
})

module.exports =app;