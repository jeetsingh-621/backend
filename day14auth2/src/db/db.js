const mongoose = require("mongoose");

function connecttodb(){

    mongoose.connect(process.env.MONGODB_URL).then(()=>{
        console.log("connect to db");
        
    }).catch((err)=>{
        console.log("connect db error",err);
        
    })
}

module.exports = connecttodb;