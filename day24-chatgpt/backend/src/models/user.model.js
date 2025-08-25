const mongoose = require("mongoose");



const userschema = new mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true
    },

    fullname:{
        firstname:{
            type:String,
            required:true,
        },
        lastname:{
            type:String,
            required:true,
        }
    },
    password:{
        type:String
    }
},{
    timestamps:true
});

const usermodel = mongoose.model("user",userschema);

module.exports = usermodel;
