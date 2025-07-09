const express = require("express");
const app = express(); //server created;

app.use(express.json());
let notes = [];
app.get("/",(req,res)=>{
    res.send("Hello World");
});
app.post("/notes",(req,res)=>{
    console.log(req.body);
    notes.push(req.body);

    res.json({
        message:"note added successfully",
        notes : notes
    })
})


app.listen(3000,()=>{
    console.log("server is start on port 3000");
    
})