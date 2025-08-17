const express = require("express");
const {getindexcontroller} = require("../controller/home.controller");
const {authuser} = require("../middleware/auth.middleware"); 


const router = express.Router();



router.get("/", authuser, getindexcontroller);


module.exports = router;
