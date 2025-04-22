```javascript
const WebSocket = require('ws');
const http = require('http');
const express = require('express');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

app.use(express.static('public'));

const rooms = new Map();

wss.on('connection', (ws) => {
    console.log('New client connected');

    ws.on('message', (message) => {
        try {
            console.log('Received:', message.toString());
            const data = JSON.parse(message);
            if (data.type === 'ping') {
                console.log('Ping received from client');
                return; // Ignore ping
            }
            if (data.type === 'join') {
                if (!rooms.has(data.room)) {
                    rooms.set(data.room, new Set());
                }
                rooms.get(data.room).add(ws);
                ws.room = data.room;
                ws.username = data.username;
                console.log(`${data.username} joined room ${data.room}`);
                broadcast(data.room, {
                    type: 'message',
                    room: data.room,
                    username: 'System',
                    message: `${data.username} joined the room`,
                    timestamp: new Date().toLocaleTimeString()
                }, ws);
            } else if (data.type === 'message') {
                broadcast(data.room, data);
            }
        } catch (e) {
            console.error('Error processing message:', e, 'Message:', message.toString());
        }
    });

    ws.on('close', () => {
        if (ws.room && ws.username) {
            const roomClients = rooms.get(ws.room);
            if (roomClients) {
                roomClients.delete(ws);
                if (roomClients.size === 0) {
                    rooms.delete(ws.room);
                }
                broadcast(ws.room, {
                    type: 'message',
                    room: ws.room,
                    username: 'System',
                    message: `${ws.username} left the room`,
                    timestamp: new Date().toLocaleTimeString()
                });
            }
            console.log(`${ws.username} disconnected from room ${ws.room}`);
        }
    });

    ws.on('error', (error) => {
        console.error('WebSocket error:', error);
    });
});

function broadcast(room, message, sender = null) {
    const roomClients = rooms.get(room);
    if (roomClients) {
        roomClients.forEach((client) => {
            if (client !== sender && client.readyState === WebSocket.OPEN) {
                try {
                    client.send(JSON.stringify(message));
                } catch (e) {
                    console.error('Error sending message to client:', e);
                }
            }
        });
    }
}

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
```
