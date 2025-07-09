const  mongoose = require("mongoose");

function connecttodb(){

    mongoose.connect("mongodb+srv://jeetsinghjeet68:zpJTqd1SimtZfHcc@cluster0.9p6uxts.mongodb.net/ohort2").then(()=>{
        console.log("db is connected");
        
    }); // in this part we are write program to connect server to database;


}

module.exports = connecttodb;