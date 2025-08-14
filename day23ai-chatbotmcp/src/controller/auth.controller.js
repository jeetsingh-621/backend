const usermodel = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
async function getregistercontroller(req,res) {

    res.render("Register")

    
};

async function postregistercontroller(req,res){
    const{username,email,password}= req.body;

    const isuserexist = await usermodel.findOne({
        $or:[
            {username:username},
            {email:email}
        ]
    });

    if(isuserexist){
        return res.status(400).json({message:"User already exist"})
    };

    const hashedpassword = await bcrypt.hash(password,10);

    const user = await usermodel.create({
        username:username,
        email:email,
        password:hashedpassword
    });

        const token =  jwt.sign({id:user._id},process.env.JWT_SECRET);

    res.cookie('token',token);
     return res.status(201).json({
        message:"user registered successfully",
        user:user
     });
}

async function getlogincontroller(req,res) {
    res.render("Login")
    
}

async function postlogincontroller(req,res) {
    const{email,password} = req.body;

    const user = await usermodel.findOne({
        email:email
    });

    if(!user){
        return res.redirect("/login ? error = user not found")
    }

    const ispasswordvalid = await bcrypt.compare(password,user.password)

    if(!ispasswordvalid){
        return res.redirect("/login ? error=Invalid password");
    }
    const token = jwt.sign({id:user._id},process.env.JWT_SECRET);

    res.cookie("token",token);

    return res.status(200).json({
        message:"user logged in successfully",
        user:user,
    })
    
}

async function getindexcontroller(req,res) {

    res.render("Index")

    
};

module.exports = {
    getregistercontroller,
    postregistercontroller,
    getlogincontroller,
    postlogincontroller,
    getindexcontroller
}