const postmodel = require("../model/post.model");
const generatecaption = require('../service/ai.service');
async function postcreatecontroller(req,res) {

    const file = req.file;
    // console.log(file);

    const base64ImageFile = Buffer.from(file.buffer).toString('base64');
    // console.log(base64ImageFile);

    const caption = await generatecaption(base64ImageFile);
    
// console.log(caption);
res.status(200).json({
    caption
})


    
    
}
module.exports = postcreatecontroller;