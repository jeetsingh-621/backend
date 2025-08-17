const {Server} = require("socket.io");

const {generatecontent} = require("../service/ai.service");
function setupsocketserver(httpserver){
    const io = new Server(httpserver,{});

    io.on("connection",(socket)=>{
        console.log("a user connected");
      
        
        socket.on("ai-message",async(message)=>{
            // console.log(message);

            const result = await generatecontent(message);

            // console.log(result);
            socket.emit("ai-response",result);
            
            
        })

        
    })

   
}
module.exports = setupsocketserver;