const app = require("./src/app");
const {createServer} = require("http");
const {Server} = require("socket.io");// install socket.io or initiallise

const httpserver = createServer(app);
const io = new Server(httpserver,{ }); // create io server with express


io.on("connection",(socket)=>{


})



httpserver.listen(3000,()=>{
    console.log("server is running on port 3000");
    
}) // io or express server start each other