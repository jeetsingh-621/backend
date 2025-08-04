const jwt = require("jsonwebtoken");
const usermodel = require("../model/user.model");
async function authmiddleware(req,res,next) {
    const {token} = req.cookies;

    if(!token){
        return res.status(401).json({
            message: "Unauthorized please login again "
        })
    }

    try {
        const decoded = jwt.verify(token,process.env.JWT_SECRET);


        const user = await usermodel.findOne({
            _id: decoded.id
        });
        req.user = user;
        next();
        
    } catch (error) {
        return res.status(401).json({
            message:"invalid token please login first"
        })
        
    }
    
}
module.exports = authmiddleware;