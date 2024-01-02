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

    const userName = socket.handshake.auth.userName;
    const socketID = socket.id;
    console.log(userName + " Joined the chat");
    console.log("His socket ID: ", socketID);

    User.addUser(userName, socketID);

    socket.on("message", data =>{
        data.to = "pravin"
        if(!User.findUserByUserName(data.to)){
            console.log(data.to + " not found!");
            return ;
        }

        io.to(User.getSocketID(data.to)).emit("responseMessage", {
            from : data.from,
            to : data.to,
            message : data.message
        });
    });
    

    socket.on('disconnect', () => {
      console.log('A user disconnected');
    });
});




export default server
