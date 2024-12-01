const socket = io(); // Connect to the server

const messagesDiv = document.getElementById('messages');
const messageForm = document.getElementById('message-form');
const messageInput = document.getElementById('message-input');

// Display a new message
function displayMessage(message, type) {
    const messageDiv = document.createElement('div');
    messageDiv.textContent = message;
    messageDiv.className = type;
    messagesDiv.appendChild(messageDiv);
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
}

// Handle incoming messages
socket.on('message', (data) => {
    displayMessage(data.message, 'received');
});

// Send a new message
messageForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const message = messageInput.value;
    displayMessage(message, 'sent');
    socket.emit('message', { message });
    messageInput.value = '';
});
