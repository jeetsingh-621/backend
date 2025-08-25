const usermodel = require("../models/user.model");
const jwt = require("jsonwebtoken");

async function authuser(req, res, next) {
  const { token } = req.cookies;

  if (!token) {
    return res.status(404).json({
      message: "Unauthorised",
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await usermodel.findById(decoded.id);
    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({
      message: "Unauthorized",
    });
  }
}
module.exports = { authuser };
