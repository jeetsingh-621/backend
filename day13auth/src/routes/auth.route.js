const express = require("express");
const usermodel = require("../models/usermodel");

const router = express.Router();

router.post("/register",async(req,res)=>{
    const {username,password}=req.body;
    // console.log(username,password);
    const user = await usermodel.create({
        password , username
    })

    res.status(201).json({
        message: "User created successfully",
        user
    })
    
});

router.post("/login",async(req,res)=>{
    const {username,password}=req.body;

    const userexist =await usermodel.findOne({
        username : username,
    });

    if(!userexist){
        return res.status(401).json({
            message:"invalid user"
        })
    };

    const validpassword = password===userexist.password;

    if(!validpassword){
        return res.status(401).json({
            message:"invalid password"
        })
    };

    res.status(201).json({
        message: "User logged in successfully",
    })


})


module.exports = router;
