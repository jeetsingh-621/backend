const express = require("express");
const { authuser } = require("../middleware/auth.middleware");
const router = express.Router();
const { createchat } = require("../controller/chat.controller");

router.post("/", authuser, createchat);

module.exports = router;
