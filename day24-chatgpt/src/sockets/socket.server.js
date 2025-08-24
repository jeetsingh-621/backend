const { Server } = require("socket.io");
const cookie = require("cookie");
const jwt = require("jsonwebtoken");
const usermodel = require("../models/user.model");
const {generateresponse,generatevector} = require("../services/ai.service");
const messagemodel = require("../models/message.model");
const{creatememory,querymemory} = require("../services/vector.service");
const { chat } = require("@pinecone-database/pinecone/dist/assistant/data/chat");
const { text } = require("express");

function initsocket(httpserver){
    const io =new Server(httpserver,{});


// middleware for user login or not
    io.use(async(socket,next)=>{
        const cookies = cookie.parse(socket.handshake.headers?.cookie||"");
        // console.log(cookies);


        if(!cookies.token){
            next(new Error("authentication error: no token provided"))
            
        }
        
        try {
            const decoded = jwt.verify(cookies.token,process.env.JWT_SECRET);
            const user = await usermodel.findById(decoded.id);
            socket.user = user;
            next();
            
        } catch (error) {
            next(new Error("invalid token"))
            
        }


    })

//if user login then server is running and user is connected
    io.on("connection",(socket)=>{
        // console.log("a user is connected",socket.id);

        socket.on("ai-message",async(messagepayload)=>{

          
            // save data in database by the using short term memeory
       

  

            // hum esme ab dono k ek sath chala rhe h kyuki time kal lage or dono eksath kaam ho jae
            const [usermessage,vectors] =await Promise.all([
                  messagemodel.create({
                    chat:messagepayload.chat,
                    user:socket.user._id,
                    content:messagepayload.content,
                    role:"user",
                }),
                generatevector(messagepayload.content),
            ]);




            const [memory,chathistory] = await Promise.all([
                 querymemory({
                queryvector:vectors,
                limit:3,
                metadata:{}
            }),
            messagemodel.find({
                chat:messagepayload.chat,
            }).sort({createdAt:-1}).limit(20).lean()


            ]);
            chathistory.reverse();

         
              
            const stm = chathistory.map(item=>{
                return{
                    role:item.role,
                    parts:[{text:item.content}]
                }
            })
            
            const ltm = [{
                role:"user",
                parts:[{text:`these are some previous messages from the chat use them to generate the response ${memory.map(item=>item.metadata.text).join("\n")}`}]
            }]
            


            const response  = await generateresponse([...ltm,...stm]);


              socket.emit("ai-response",{
                content : response,
                chat:messagepayload.chat
            })

                const[responsemessage,responsevectors] = await Promise.all([
                    messagemodel.create({
                chat:messagepayload.chat,
                user:socket.user._id,
                content:response,
                role:"model",
            }),
            generatevector(response)
                ])
            
          
                 await creatememory({
                vectors:responsevectors,
                messageid:responsemessage.id,
                metadata:{
                    chat:messagepayload.chat,
                    user:socket.user._id,
                    text:response
                }
            })
           

        
            

          
            
        })
        
    })
}
module.exports = initsocket;