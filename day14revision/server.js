require("dotenv").config();
const app = require("./app");
const connecttodb = require("./src/db/db");



connecttodb();

app.listen(3000,()=>{
    console.log("server running on port 3000");
    
});
