const app = require("./src/app");
const connectdb = require("./src/db/db");
const http = require("http");
const setupsocketserver = require("./src/socket/socket.server");

const httpserver = http.createServer(app);
setupsocketserver(httpserver);

connectdb();
httpserver.listen(3000,()=>{
    console.log("Server is running on port 3000");
});
