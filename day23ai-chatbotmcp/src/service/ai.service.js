const {GoogleGenAI } = require("@google/genai");
// The client gets the API key from the environment variable `GEMINI_API_KEY`.
const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
});

async function generatecontent(prompt) {
 const result = await ai.models.generateContent({
    model:"gemini-2.0-flash",
    contents :prompt
 })

 return result.text
    
}
module.exports={generatecontent};
