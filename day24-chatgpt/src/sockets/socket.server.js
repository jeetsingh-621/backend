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
            // console.log(messagepayload);

          
            // save data in database by the using short term memeory
          const usermessage =   await messagemodel.create({
                chat:messagepayload.chat,
                user:socket.user._id,
                content:messagepayload.content,
                role:"user",
            })

  const vectors = await generatevector(messagepayload.content); // vector bana liyea hmne 
            // console.log(vectors);

            await creatememory({
                vectors,
                messageid:usermessage.id,
                metadata:{
                    chat:messagepayload.chat,
                    user:socket.user._id,
                    text:messagepayload.content
                }

            })


            

            // show all data have in a database 
            const chathistory = (await messagemodel.find({
                chat:messagepayload.chat,
            }).sort({createdat:-1}).limit(20).lean()).reverse();
            console.log(chathistory.map(item=>{
                return{
                    role:item.role,
                    parts:[{text:item.content}]
                }
            }));
            
            const response  = await generateresponse(chathistory.map(item=>{
                return{
                    role:item.role,
                    parts:[{text:item.content}]
                }
            }));

            const responsevectors = await generatevector(response);
             const responsemessage =  await messagemodel.create({
                chat:messagepayload.chat,
                user:socket.user._id,
                content:response,
                role:"model",
            })
            await creatememory({
                vectors:responsevectors,
                messageid:responsemessage.id,
                metadata:{
                    chat:messagepayload.chat,
                    user:socket.user._id,
                    text:response
                }
            })

            const memory = await querymemory({
                queryvector:vectors,
                limit:3,
                metadata:{}
            });
            console.log(memory);
            

            socket.emit("ai-response",{
                content : response,
                chat:messagepayload.chat
            })
            
        })
        
    })
}
module.exports = initsocket;