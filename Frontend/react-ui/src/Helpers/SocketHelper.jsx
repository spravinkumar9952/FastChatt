import io from "socket.io-client"


const socket = io("http://localhost:5000", {autoConnect : false});

const connectWithServer = (userName) => {
    socket.auth = {userName};
    socket.connect();
}


export {socket, connectWithServer};
