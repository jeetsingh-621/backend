const usermodel = require("../models/user.model");


async function getindexcontroller(req,res) {

    res.render("Index")

    
};

module.exports = { getindexcontroller}