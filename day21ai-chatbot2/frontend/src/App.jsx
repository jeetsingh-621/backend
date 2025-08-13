import React, { useState, useRef, useEffect } from 'react';
import './App.css';
import { io } from "socket.io-client";

const App = () => {
  const [messages, setMessages] = useState([]);
  const [socket, setsocket] = useState(null)
  const [inputMessage, setInputMessage] = useState('');
  const messagesEndRef = useRef(null);

  // Auto-scroll to bottom when new messages are added
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
    let socketinstance = io("https://jeeai-chatbot-hax6.onrender.com",{transports: ["websocket"]});
    setsocket(socketinstance)

    socketinstance.on("ai-message-response",(response)=>{
     const botResponse = {
        id: Date.now() + 1,
        text:response,
        sender: 'bot',
        timestamp: new Date().toLocaleTimeString()
      };
      setMessages(prevMessages => [...prevMessages, botResponse]);

    })

  }, []);

  const handleSendMessage = () => {
    if (inputMessage.trim() === '') return;

    const newMessage = {
      id: Date.now(),
      text: inputMessage,
      sender: 'user',
      timestamp: new Date().toLocaleTimeString()
    };

    setMessages(prevMessages => [...prevMessages, newMessage]);

    socket.emit("ai-message",inputMessage);
    setInputMessage('');


    // Simulate bot response (can be replaced with actual API call)
    
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <div className="chat-container">
      <div className="chat-header">
        <h2>Chat Screen</h2>
      </div>
      
      <div className="messages-container">
        {messages.length === 0 ? (
          <div className="empty-state">
            <p>No messages yet. Start a conversation!</p>
          </div>
        ) : (
          messages.map((message) => (
            <div
              key={message.id}
              className={`message ${message.sender === 'user' ? 'user-message' : 'bot-message'}`}
            >
              <div className="message-content">{message.text}</div>
              <div className="message-time">{message.timestamp}</div>
            </div>
          ))
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="input-container">
        <input
          type="text"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Type your message..."
          className="message-input"
        />
        <button 
          onClick={handleSendMessage} 
          className="send-button"
          disabled={!inputMessage.trim()}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default App;
