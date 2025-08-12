require('dotenv').config();
const app = require("./src/app");
const {createServer} = require("http");
const {Server} = require("socket.io");

const httpserver = createServer(app);
const io = new Server(httpserver, { 
    cors:{
        origin: "http://localhost:5173",
    }
});

const generateresponse = require("./src/ai.service");



const chathistory =[]; // short term memory

io.on("connection",(socket)=>{
    console.log("a new client connected");

socket.on("ai-message",async(data)=>{
    chathistory.push({
        role:"user",
        parts:[{text:data}],
    });
    
    const response = await generateresponse(chathistory);
    console.log("ai-response",response);

    chathistory.push({
        role:"model",
        parts:[{text:response}]
    });

    socket.emit("ai-message-response",response)
});

    
socket.on("disconnect",()=>{
    console.log("a client disconnected");
});

socket.on("mama",(data)=>{
    console.log("message recivied", data);
})
})



httpserver.listen(3000,()=>{
    console.log("Server is running on port 3000");
});