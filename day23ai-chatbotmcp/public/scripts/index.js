// Select DOM elements
const messagesContainer = document.querySelector('.messages-container');
const messageInput = document.querySelector('.message-input');
const sendButton = document.querySelector('.send-button');

// Load Welcome Message
function loadWelcomeMessage() {
    const welcomeMessage = {
        role: 'assistant',
        content: 'Hello! I\'m your AI assistant 🤖. How can I help you today?',
        timestamp: new Date()
    };
    renderMessage(welcomeMessage);
}

// Send Message
function sendMessage() {
    const messageText = messageInput.value.trim();
    if (!messageText) return;

    // Show user message
    const userMessage = {
        role: 'user',
        content: messageText,
        timestamp: new Date()
    };
    renderMessage(userMessage);

    // Emit message to server
    socket.emit("ai-message", messageText);

    // Clear input
    messageInput.value = '';
    adjustTextareaHeight();

    // Show thinking animation
    showThinkingIndicator();
}

// Show Thinking Indicator
function showThinkingIndicator() {
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
    messagesContainer.appendChild(thinkingDiv);
    scrollToBottom();
}

// Hide Thinking Indicator
function hideThinkingIndicator() {
    const thinkingDiv = document.getElementById('thinking-indicator');
    if (thinkingDiv) thinkingDiv.remove();
}

// Render message to chat
function renderMessage(message) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${message.role}`;
    const avatar = message.role === 'user' ? 'U' : '🤖';

    messageDiv.innerHTML = `
        <div class="message-avatar">${avatar}</div>
        <div class="message-content">${escapeHtml(message.content)}</div>
    `;

    messagesContainer.appendChild(messageDiv);
    scrollToBottom();
}

// Scroll to bottom
function scrollToBottom() {
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

// Escape HTML (security)
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Auto resize textarea
function adjustTextareaHeight() {
    messageInput.style.height = 'auto';
    messageInput.style.height = Math.min(messageInput.scrollHeight, 120) + 'px';
}

// Listen for AI response from server
socket.on("ai-response", (responseText) => {
    hideThinkingIndicator();
    const aiMessage = {
        role: 'assistant',
        content: responseText,
        timestamp: new Date()
    };
    renderMessage(aiMessage);
});

// Event Listeners
sendButton.addEventListener('click', sendMessage);
messageInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        sendMessage();
    }
});

// Initialize Chat
document.addEventListener('DOMContentLoaded', () => {
    loadWelcomeMessage();
    adjustTextareaHeight();
});
