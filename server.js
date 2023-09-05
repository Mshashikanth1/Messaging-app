const express = require("express");
const socketIo = require("socket.io");
const mongoose = require("mongoose");
const cors = require("cors");
const {createServer} = require("http");
const http = require("http");

const app=express();
const port=3001;

mongoose.connect("mongodb://localhost:27017/simple-chat-app");

app.use(cors());


app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});


const server = http.createServer(app); // Create an HTTP server using 'app'

// Create a WebSocket server using 'socket.io' and attach it to the HTTP server
const io = socketIo(server);

io.on('connection', (socket) => {
  console.log('A user connected');

  socket.on('chat message', (message) => {
    io.emit('chat message', message); // Broadcast the message to all connected clients
  });

  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});

server.listen(3001, () => {
  console.log('Chat Server is running on http://localhost:3001');
});