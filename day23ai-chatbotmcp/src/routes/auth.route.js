const express = require("express");
const {getregistercontroller, postregistercontroller,getlogincontroller,postlogincontroller, userlogoutcontroller
    
} = require("../controller/auth.controller");

const router = express.Router();



router.route("/register").get(getregistercontroller).post(postregistercontroller);

router.route("/login").get(getlogincontroller).post(postlogincontroller)

router.route("/logout").get(userlogoutcontroller);

module.exports = router;