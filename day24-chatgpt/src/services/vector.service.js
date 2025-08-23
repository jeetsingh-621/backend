const {Pinecone} = require("@pinecone-database/pinecone");

const pc = new Pinecone({apiKey:process.env.YOUR_API_KEY});

const cohortchatgptindex = pc.Index("cohort-chatgpt");

async function creatememory({vectors,messageid,metadata}){

    await cohortchatgptindex.upsert([{
        id:messageid,
        values:vectors,
        metadata
    }])

}

async function querymemory({queryvector,limit=5,metadata}){
    const data = await cohortchatgptindex.query({
        vector:queryvector,
        topK:limit,
        filter:metadata?{metadata}:undefined,
        includeMetadata:true
        
    })
return data.matches
}
module.exports = {creatememory,querymemory};