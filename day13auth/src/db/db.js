const mongoose = require("mongoose");

function connecttodb(){
    mongoose.connect(process.env.MONGODB_URL).then(()=>{
        console.log("connected to db");
        
    }).catch((err)=>{
        console.log("mongodb error",err);
        
    });
}

module.exports = connecttodb;