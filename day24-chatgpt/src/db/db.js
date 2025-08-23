
const mongoose = require("mongoose");

async function connectdb() {

    try {
        await mongoose.connect(process.env.MONGODB_URI)
        console.log("mongodb database is connected")

    } catch (error) {

        console.log("mongodb error",error)
        
    }
    
}

module.exports = connectdb;
