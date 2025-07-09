const express = require("express");
const connecttotdb = require("./src/db/db")

const app = express(); // create server
connecttotdb();
app.use(express.json()) // middleware create to read data and use data
app.post("/notes",(req,res)=>{
    const {title,desc} = req.body;  
    console.log( `title : ${title}, desc : ${desc}`);
    res.send({
        "message":"created successfully"
    })
    
})

app.listen(3000,()=>{
    console.log("server running on port 3000");
    
})// start server