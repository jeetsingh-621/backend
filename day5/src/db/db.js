const mongoose = require("mongoose");


function connecttodb(){

mongoose.connect("mongodb+srv://jeetsinghjeet68:Kqi5F2dJtIiWIpK7@cluster0.9p6uxts.mongodb.net/cohort1").then(()=>{
    console.log("db connected");
    
})

}
module.exports = connecttodb;