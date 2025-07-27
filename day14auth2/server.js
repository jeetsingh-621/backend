require("dotenv").config();
const app = require("./app");
const connecttodb = require("./src/db/db");
const express = require("express");






connecttodb();



app.listen(3000,()=>{
    console.log("server start on port 3000");
    
});