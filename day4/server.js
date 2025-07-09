const express = require("express");
const app = express(); //server created

let notes =[];

app.use(express.json()); //middleware created
app.get("/notes",(req,res)=>{
        res.json(notes)
}); // get data

app.post("/notes",(req,res)=>{
    console.log(req.body);
    notes.push(req.body);

    res.json({
        "message":"Note Added Successfully",
    })
    
});// add new data 

app.delete("/notes/:index",(req,res)=>{
    const index = req.params.index;
    delete notes[index];

    res.json({
        "message":"deleted sucessfully"
    })
});//delete data

app.patch("/notes/:index",(req,res)=>{
    const index = req.params.index;
    const {title} = req.body;
    notes[index].title = title;

    res.json({
        "message":"updated sucessfully"
    })
})//update data on the server

app.listen(3000,()=>{
    console.log("server start on port 3000");
    
})