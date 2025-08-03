const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const usermodel = require("../model/user.model");

async function registerController(req,res) {
      const {username,password} = req.body;

    const existuser = await usermodel.findOne({
        username
    });

    if(existuser){
        return res.status(409).json({
            message:"user exist allready"
        })
    };

    // console.log(username,password);
    const user = await usermodel.create({
        username,
        password: await bcrypt.hash(password,10),
    });

    const token = jwt.sign({
        id:user._id
    },process.env.JWT_SECRET);

    res.cookie("token",token);
    res.status(201).json({
        message:"user created successfully",
        user
    })
}

async function loginController(req,res) {
      const {username,password}=req.body;
    const user = await usermodel.findOne({username});

    if(!user){
        return res.status(404).json({
            message:"user account not found please signup first"
        })
    }
    const ispasswordvalid = await bcrypt.compare(password,user.password);

    if(!ispasswordvalid){
        return res.status(409).json({
            message:"incorrect password"
        })
    }
    const token = jwt.sign({id:user._id},process.env.JWT_SECRET);

    res.cookie("token",token);

    res.status(200).json({
        message:"user logged in successfully"
    })
    
}


module.exports = {registerController,
    loginController,
}