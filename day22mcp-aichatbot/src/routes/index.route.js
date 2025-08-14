const express = require("express");

const router = express.Router();


router.get("/",(req,res)=>{
    // res.send("welcome to home page")
    res.render("index");
})


module.exports = router;