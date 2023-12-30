// const socketIO = require("socket.io");
// const http = require("http");

import {Server} from "socket.io"
import http from "http"
import app from "../AppManager/AppManagerServer.js"

const server = http.createServer(app);
import User from "../UsersManger/UserController.js"

const io = new Server(server, {
    cors: {
        origin: "*",
    }
});

io.use((socket, next) => {
    const userName = socket.handshake.auth.userName;
    console.log(userName, " Connected");
    next();
})

io.on('connection', (socket) => {

    socket.on("message", data =>{
        socket.join(data.to);
        io.to(data.to).emit("responseMessage", "Hello " + data.msg);
    });
    

    socket.on('disconnect', () => {
      console.log('A user disconnected');
    });
});


export default server
