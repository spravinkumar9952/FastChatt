// const socketIO = require("socket.io");
// const http = require("http");

import {Server} from "socket.io"
import http from "http"
import app from "../AppManager/AppManagerServer.js"
import { addUsers, getUsers , getUserSocketIDByUserName, deleteUserBySocketID} from "../DBManager/Users.js";

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

    addUsers(userName, socketID);

    socket.on("message", data =>{
        console.log("To", 
        data.to)
        const socketIDPromise = getUserSocketIDByUserName(data.to);
        socketIDPromise.then((res) => {
            if(res.rowCount <= 0){
                console.log("User Not found");
            }else{
                const targetSocketID = res.rows[0];
                console.log(targetSocketID, "dfadsfadsfa");
                io.to(User.getSocketID(data.targetSocketID)).emit("responseMessage", {
                    from : data.from,
                    to : data.to,
                    message : data.message
                });
            }
        })
        
        console.log("socketIdPromise", socketID);

        
    });
    

    socket.on('disconnect', () => {
        deleteUserBySocketID(socket.id);
    });
});




export default server
