const usermodel = require("../models/user.model");
const jwt = require("jsonwebtoken");


async function authuser(req,res,next) {

    const token = req.cookies.token;
    // console.log(token);
    

    if(!token){
        return res.redirect("/auth/login")
    }

    try {
        const decoded = jwt.verify(token,process.env.JWT_SECRET);

    const user = await usermodel.findById(decoded.id);
    req.user = user;
    next();
    } catch (error) {
        return res.redirect("/auth/login")
    }
    
}

module.exports = {authuser};