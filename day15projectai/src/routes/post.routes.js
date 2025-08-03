const express = require("express");
const multer = require("multer");
const authmiddleware = require("../middleware/authmiddleware");
const postcreatecontroller = require("../controller/post.controller");


const router = express.Router();

const upload = multer({storage:multer.memoryStorage()});


router.post("/", authmiddleware,upload.single("image"), postcreatecontroller);


module.exports = router;