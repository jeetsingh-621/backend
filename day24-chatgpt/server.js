require("dotenv").config();
const app =  require("./src/app");
const connectdb = require("./src/db/db");
const initsocket = require("./src/sockets/socket.server");
const httpserver = require("http").createServer(app);

initsocket(httpserver);

connectdb();


httpserver.listen(3000,()=>{
 console.log("server running on port 3000")
}    
);
