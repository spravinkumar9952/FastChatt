// const socketIO = require("socket.io");
// const http = require("http");

import {Server} from "socket.io"
import http from "http"
import app from "../AppManager/AppManagerServer.js"
import { addUsers , getUserSocketIDByUserName, deleteUserByName} from "../DBManager/Users.js";

const server = http.createServer(app);

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
    console.log(userName + " Joined the chat and His Socket id " + socketID);

    addUsers(userName, socketID);

    socket.on("message", data =>{
        const socketIDPromise = getUserSocketIDByUserName(data.to);
        socketIDPromise.then((res) => {
            if(res.rowCount <= 0){
                console.log(data.to + " Not found");
            }else{
                const targetSocketID = res.rows[0].socket_id; 
                console.log("Sent message from " + userName + " to " + data.to);
                console.log("Sent message from " +  socketID + " to " + targetSocketID);
                io.to(targetSocketID).emit("responseMessage", {
                    from : data.from,
                    to : data.to,
                    message : data.message
                });
            }
        })
    });
    

    socket.on('disconnect', () => {
        console.log("disconnect hitted");
        deleteUserByName(socket.handshake.auth.userName);
    });
});




export default server
