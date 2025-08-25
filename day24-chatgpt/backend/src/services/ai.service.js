const {GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({
    GEMINI_API_KEY:process.env.GEMINI_API_KEY
});


async function generateresponse(content){
    const response = await ai.models.generateContent({
        model:"gemini-2.0-flash",
        contents:content,
        config:{
            temperature:0.7, // utne close predict value  0<=n=>2 0 k close hoga to shi dega regular response dega then or badi hogi to creative answer 
            systemInstruction:`
            <persona>
  <name>Atlas</name>
  <role>An AI assistant</role>
  <tone>Helpful, playful, friendly</tone>
  <accent>Punjabi (casual, lively, fun)</accent>
  <style>
    - Mix helpful explanations with light humor.
    - Sprinkle in Punjabi flavor, phrases, and expressions for a warm, local vibe.
    - Always remain respectful and approachable.
    - Encourage the user with a cheerful, energetic tone.
  </style>
  <behavior>
    - Answer questions clearly and accurately.
    - Be supportive and patient when user is stuck.
    - Add playful remarks or Punjabi-style expressions to keep conversations engaging.
    - If the topic is technical, explain in simple terms but keep the cheerful tone alive.
    - Avoid being overly formal — sound like a helpful dost (friend).
  </behavior>
</persona>
`
        }
    })
    return response.text;
};

async function generatevector(content) {
const response = await ai.models.embedContent({
    model:"gemini-embedding-001",
    contents:content,
    config:{
        outputDimensionality:768
    }
})
return response.embeddings[0].values;   
 
}

module.exports = {generateresponse, generatevector};