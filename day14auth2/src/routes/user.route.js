const express = require("express");
const usermodel = require("../models/usermodel");
const jwt = require("jsonwebtoken");



const router = express.Router();

router.post("/register",async(req,res)=>{
    const {username ,password} = req.body;
    // console.log(username,password);

    const user = await usermodel.create({
        username,password
    });

    const token = jwt.sign({
        id:user._id
    },process.env.JWT_SECRET);

    // console.log(token);
    

res.cookie("token",token); // cookie parser ka use krke token ko cokkie me save krege 
    res.status(201).json({
        message : "user created succesfully",
        user,
        // token // yha hum token to send kr rhe the pehle 
    })
    

})
router.get("/user",async(req,res)=>{
    // const {token} = req.body; // simple body ka use krke
    const {token} = req.cookies;  // cookie-parse ka use krke cokkie me se lege token ko 

    if(!token){
        return res.status(401).json({
            message:"unauthorized token"
        });
    }

    const decoded = jwt.verify(token,process.env.JWT_SECRET);
    // res.send(decoded); 

    const user  =await usermodel.findOne({
        _id:decoded.id
    }).select("-password");
    res.status(201).json({
        message:"user data fetched succesfully",
        user
    })
    
})

module.exports = router;
