const { GoogleGenAI }  = require("@google/genai");

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY
});

async function generatecaption(base64ImageFile){

  if (!base64ImageFile) {
    throw new Error("Image data is missing");
  }
  const contents = [
  {
    inlineData: {
      mimeType: "image/jpeg",
      data: base64ImageFile,
    },
  },
  { text: "Caption this image." },
];

const response = await ai.models.generateContent({
  model: "gemini-2.5-flash",
  contents: contents,
    config: {
     
       systemInstruction: `
    You are an Instagram caption expert. 
    When given an image, generate a short and catchy caption. 
    Use emojis,  and add swag or attitude.
    The caption should sound like it’s made for viral reels or cool photo posts.
    Keep it under 50 words. Add personality and fun. Avoid being formal.
  `
    },
});
return response.text;
}
module.exports = generatecaption;