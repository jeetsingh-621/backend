const mongoose = require("mongoose");

function connectdb() {

mongoose.connect(process.env.MONGO_URL).then(()=>{
    console.log("connected to database");
}).catch((err)=>{
    console.log("database error",err);
})
    
}

module.exports = connectdb;