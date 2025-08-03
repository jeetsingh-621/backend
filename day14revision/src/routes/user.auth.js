const express = require("express");
const usermodel = require("../model/user.model");
const jwt = require("jsonwebtoken");

const router = express.Router();

router.post("/register",async(req,res)=>{
    const{username,password} = req.body;
    // console.log(username,password);

    const isuserexist = await usermodel.findOne({username});
    if(isuserexist){
        return res.status(409).json({
            message:"user already exists"
        });
    }

       const user = await usermodel.create({
            username,password
        });
        const token = jwt.sign( {id:user._id},process.env.JWT_SECRET);
        // console.log(token);
        
    res.cookie("token",token);

        res.status(201).json({
            message:"user created successfully",
            user,
        });
});


router.get("/user",async(req,res)=>{
    const {token} = req.cookies;

    if(!token){
        return res.status(409).json({
            message:"unauthorised token"
        })
    }

    const decoded = jwt.verify(token,process.env.JWT_SECRET);
//    console.log(decoded); 
const user = await usermodel.findOne({
    _id : decoded.id
});

res.status(201).json({
    message:"user fetched successfully",
    user
})
})
//login

router.post("/login",async(req,res)=>{
    const {username,password}=req.body;

    const userexist = await usermodel.findOne({username});
    if(!userexist){
        return res.status(404).json({
            message:"user not exist please register first"
        })
    };

    const passwordexist = password === userexist.password;
    if(!passwordexist){
        return res.status(404).json({
            message:"password is incorrect"
        })
    }

    const token  = jwt.sign({id:userexist._id},process.env.JWT_SECRET);
    res.cookie("token",token,{
        expires:new Date(Date.now()+1000*60*60*24*7),
    });

    res.status(201).json({
        message:"usser logged in successfully"
    })
})



//logout

router.get("/logout",async(req,res)=>{
    res.clearCookie("token")

    res.status(200).json({
        message:" logout successfully "
    })
})

module.exports = router;
