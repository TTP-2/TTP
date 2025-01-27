    const messageInput = document.getElementById('messageInput');
    const sendButton = document.getElementById('sendButton');
    const chatMessages = document.getElementById('chatMessages');

    // Function to add a message
    function addMessage(text, type) {
      const messageDiv = document.createElement('div');
      messageDiv.classList.add('message', type);
      messageDiv.textContent = text;

      chatMessages.appendChild(messageDiv);

      // Scroll to the latest message
      chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    // Event listener for the "Send" button
    sendButton.addEventListener('click', () => {
      const messageText = messageInput.value.trim();

      if (messageText !== '') {
        addMessage(messageText, 'sent'); // Add sent message
        messageInput.value = ''; // Clear input field

        // Simulate a reply after a short delay
        setTimeout(() => {
          addMessage("This is a reply!", 'received'); // Add received message
        }, 1000);
      }
    });

    // Allow pressing "Enter" to send a message
    messageInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        sendButton.click();
      }
    });
