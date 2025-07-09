const mongoose = require("mongoose");


const noteschema = new mongoose.Schema({
    title:String,
    desc: String
}); // its defined the structure of over data;

const notemodel = mongoose.model("notes",noteschema); // its used to perfome crud opertaion is easily

module.exports = notemodel;