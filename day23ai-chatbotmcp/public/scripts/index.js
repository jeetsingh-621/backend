// Chat functionality with AI bot emoji and thinking animation
class ChatApp {
    constructor() {
        this.messages = [];
        this.currentModel = 'gpt-3.5-turbo';
        this.init();
    }

    init() {
        this.cacheDOM();
        this.bindEvents();
        this.loadWelcomeMessage();
    }

    cacheDOM() {
        this.messagesContainer = document.querySelector('.messages-container');
        this.messageInput = document.querySelector('.message-input');
        this.sendButton = document.querySelector('.send-button');
        this.modelSelector = document.querySelector('.model-selector');
    }

    bindEvents() {
        this.sendButton.addEventListener('click', () => this.sendMessage());
        this.messageInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                this.sendMessage();
            }
        });
        
        if (this.modelSelector) {
            this.modelSelector.addEventListener('change', (e) => {
                this.currentModel = e.target.value;
            });
        }
    }

    loadWelcomeMessage() {
        const welcomeMessage = {
            role: 'assistant',
            content: 'Hello! I\'m your AI assistant 🤖. How can I help you today?',
            timestamp: new Date()
        };
        
        this.messages.push(welcomeMessage);
        this.renderMessage(welcomeMessage);
    }

    async sendMessage() {
        const messageText = this.messageInput.value.trim();
        if (!messageText) return;

        // Add user message
        const userMessage = {
            role: 'user',
            content: messageText,
            timestamp: new Date()
        };
        
        this.messages.push(userMessage);
        this.renderMessage(userMessage);
        
        // Clear input
        this.messageInput.value = '';
        this.adjustTextareaHeight();
        
        // Show thinking indicator
        this.showThinkingIndicator();
        
        // Simulate AI response (replace with actual API call)
        setTimeout(() => {
            this.hideThinkingIndicator();
            this.receiveMessage(messageText);
        }, 2000);
    }

    showThinkingIndicator() {
        const thinkingDiv = document.createElement('div');
        thinkingDiv.className = 'thinking-container show';
        thinkingDiv.id = 'thinking-indicator';
        thinkingDiv.innerHTML = `
            <div class="thinking-avatar">🤖</div>
            <div class="thinking-content">
                AI is thinking
                <div class="thinking-dots">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </div>
        `;
        this.messagesContainer.appendChild(thinkingDiv);
        this.scrollToBottom();
    }

    hideThinkingIndicator() {
        const thinkingDiv = document.getElementById('thinking-indicator');
        if (thinkingDiv) {
            thinkingDiv.remove();
        }
    }

    async receiveMessage(userMessage) {
        // This is where you would make an API call to your backend
        // For now, we'll simulate a response
        
        const responses = [
            "That's an interesting question! Let me help you with that. 🤖",
            "I understand what you're asking. Here's what I think... 🤖",
            "Based on my knowledge, I would suggest... 🤖",
            "That's a great point! Let me provide some insights... 🤖",
            "I can definitely help with that. Here's my response... 🤖"
        ];
        
        const randomResponse = responses[Math.floor(Math.random() * responses.length)];
        
        const aiMessage = {
            role: 'assistant',
            content: `${randomResponse} You asked: "${userMessage}"`,
            timestamp: new Date()
        };
        
        this.messages.push(aiMessage);
        this.renderMessage(aiMessage);
    }

    renderMessage(message) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${message.role}`;
        
        const avatar = message.role === 'user' ? 'U' : '🤖';
        
        messageDiv.innerHTML = `
            <div class="message-avatar">${avatar}</div>
            <div class="message-content">${this.escapeHtml(message.content)}</div>
        `;
        
        this.messagesContainer.appendChild(messageDiv);
        this.scrollToBottom();
    }

    scrollToBottom() {
        this.messagesContainer.scrollTop = this.messagesContainer.scrollHeight;
    }

    adjustTextareaHeight() {
        this.messageInput.style.height = 'auto';
        this.messageInput.style.height = Math.min(this.messageInput.scrollHeight, 120) + 'px';
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    // Utility method to clear chat
    clearChat() {
        this.messages = [];
        this.messagesContainer.innerHTML = '';
        this.loadWelcomeMessage();
    }

    // Method to export chat history
    exportChat() {
        const chatHistory = this.messages.map(msg => ({
            role: msg.role,
            content: msg.content,
            timestamp: msg.timestamp.toISOString()
        }));
        
        const blob = new Blob([JSON.stringify(chatHistory, null, 2)], {
            type: 'application/json'
        });
        
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'chat-history.json';
        a.click();
        URL.revokeObjectURL(url);
    }
}

// Initialize the chat app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.chatApp = new ChatApp();
});

// Handle textarea auto-resize
document.addEventListener('DOMContentLoaded', () => {
    const textarea = document.querySelector('.message-input');
    if (textarea) {
        textarea.addEventListener('input', function() {
            this.style.height = 'auto';
            this.style.height = Math.min(this.scrollHeight, 120) + 'px';
        });
    }
});
