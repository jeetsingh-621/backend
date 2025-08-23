const express = require("express");
const usermodel = require("../models/user.model");
const {registerusercontroller, loginusercontroller} = require("../controller/user.authcontroler");

const router = express.Router();



router.post("/register",registerusercontroller);
router.post("/login",loginusercontroller);

module.exports = router;