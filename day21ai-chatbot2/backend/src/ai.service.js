const { GoogleGenAI } = require("@google/genai");
const ai = new GoogleGenAI({});

async function generateresponse(chathistory) {
    const response = await ai.models.generateContent({
        model:"gemini-2.0-flash",
        contents:chathistory
    })
    return response.text
    
}
module.exports = generateresponse;