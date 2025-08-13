require('dotenv').config();
const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");

const app = express();
const httpserver = createServer(app);

// ✅ Environment variable se port lo (Render ke liye)
const PORT = process.env.PORT || 3000;

// ✅ CORS setup — Vercel ka live frontend URL allow karo
const io = new Server(httpserver, { 
    cors: {
        origin: [
            "http://localhost:5173",                  // local dev
            "https://jeeai-chatbot.vercel.app/" // apna actual Vercel frontend URL yahan daalo
        ],
        methods: ["GET", "POST"]
    }
});

const generateresponse = require("./src/ai.service");
const chathistory = []; // short term memory

io.on("connection", (socket) => {
    console.log("a new client connected");

    socket.on("ai-message", async (data) => {
        chathistory.push({
            role: "user",
            parts: [{ text: data }],
        });

        const response = await generateresponse(chathistory);
        console.log("ai-response", response);

        chathistory.push({
            role: "model",
            parts: [{ text: response }]
        });

        socket.emit("ai-message-response", response);
    });

    socket.on("disconnect", () => {
        console.log("a client disconnected");
    });

    socket.on("mama", (data) => {
        console.log("message received", data);
    });
});

// ✅ Basic route
app.get("/", (req, res) => {
    res.send("Hello World");
});

// ✅ Server start
httpserver.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
