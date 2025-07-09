const express  =  require("express");
const app = express(); // server created
const connecttodb = require("./src/db/db");//db
const notemodel = require("./src/models/note.model");

app.use(express.json()); // middleware created to read a req data;

app.post("/notes",async(req,res)=>{
const {title,desc} = req.body;

   await notemodel.create({
        title,desc
    });
    res.json({
        message:"create successfully"
    })
}); // create operation

app.get("/notes",async(req,res)=>{

    const notes = await notemodel.find();

    res.json({
        message:"fetch data successfully",
        notes
    })
});// read operation 
app.delete("/notes/:id",async(req,res)=>{
    const noteid = req.params.id;

    await notemodel.findOneAndDelete({
        _id : noteid,
    });
    res.json({
        message:"delete successfully"
    })

})// delete

app.patch("/notes/:id",async(req,res)=>{
    const noteid = req.params.id;
    const {title,desc} = req.body;
    await notemodel.findOneAndUpdate({
        _id:noteid
    },{
        title:title,
        desc:desc
    });
    res.json({
        message:"update successfully"
    })
}); // update


connecttodb(); // call program function into server js file
app.listen(3000,()=>{
    console.log("server is running on port 3000");
    
}); // server start