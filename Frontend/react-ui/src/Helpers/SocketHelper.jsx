import io from "socket.io-client"


const socket = io("http://localhost:5000", {autoConnect : false});

const connectedUsers = new Map();

const connectWithServer = (userName) => {
    if(connectedUsers.has(userName)) return;

    socket.auth = {userName};
    const socketConnection = socket.connect();

    socketConnection.on("connect", () => {
        const socketID = socketConnection.id;
        console.log("Session ID => ", socketID);
        connectedUsers.set(userName, socketID);
    })

    const handleTabClose = event => {
        event.preventDefault();
        socket.disconnect();
        console.log("Socket Disconnect called in reload");
        return (event.returnValue ='Are you sure you want to exit?');
    };
  
      window.addEventListener('beforeunload', handleTabClose);
}


export {socket, connectWithServer, connectedUsers};
