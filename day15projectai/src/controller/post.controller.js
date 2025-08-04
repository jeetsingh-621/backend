const postmodel = require("../model/post.model");
const generatecaption = require('../service/ai.service');
const uploadfile = require("../service/storage.service");
const {v4:uuidv4} = require("uuid");
const user = require("../model/user.model")
async function postcreatecontroller(req,res) {

    const file = req.file;
    // console.log(file);

    const base64ImageFile = Buffer.from(file.buffer).toString('base64');
    // console.log(base64ImageFile);

    const caption = await generatecaption(base64ImageFile);

    const result = await uploadfile(file.buffer,`${uuidv4()}`);

    // console.log(result);


    
// console.log(caption);
console.log("decoded user",req.user._id);


const post = await postmodel.create({
    caption: caption,
    image:result.url,
    user : req.user._id,
});


res.status(201).json({
   message:"post created successfully",
   post,
})


    
    
}
module.exports = postcreatecontroller;