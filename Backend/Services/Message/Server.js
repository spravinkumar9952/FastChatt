const express = require("express");
const socketIO = require("socket.io");
const http = require("http");

const app = express();
const io = socketIO(http.createServer(app))

io.on('connection', (socket) => {
    console.log('A user connected');
    socket.on('disconnect', () => {
      console.log('A user disconnected');
    });
  });

app.get("/", (req, res) => {
    console.log("Hello");
    res.send("Hello")
})

app.listen(5000);   