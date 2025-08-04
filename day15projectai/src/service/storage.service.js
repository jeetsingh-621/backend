const ImageKit = require("imagekit");

var imagekit = new ImageKit({
    publicKey : process.env.IMAGEKIT_PUBLIC_KEY,

    privateKey : process.env.IMAGEKIT_PRIVATE_KEY,
    urlEndpoint : process.env.IMAGEKIT_URL_ENDPOINT,
});



async function uploadfile(file,filename) {
    const response = await imagekit.upload({
        file:file,
        fileName:filename,
        folder:"cohort-ai-social"
    })
return response;
}

module.exports = uploadfile;