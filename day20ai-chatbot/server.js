const app = require("./src/app");

const {createServer} = require("http");
const {Server} = require("socket.io");
const httpserver = createServer(app);

const io = new Server(httpserver,{});


io.on("connection",(socket)=>{
    console.log("user connected");
    
})




app.listen(3000,()=>{
    console.log("server is running on port 3000");
    
});
