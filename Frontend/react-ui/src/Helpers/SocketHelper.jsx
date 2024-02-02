import io from "socket.io-client"


const socket = io("http://localhost:5000", {autoConnect : false});


const connectWithServer = (userName) => {
    socket.auth = {userName};
    const socketConnection = socket.connect();

    socketConnection.on("connect", () => {
        const socketID = socketConnection.id;
        console.log("Session ID => ", socketID);
    })

    // const handleTabClose = event => {
    //     event.preventDefault();
    //     socket.disconnect();
    //     console.log("Socket Disconnect called in reload");
    //     return (event.returnValue ='Are you sure you want to exit?');
    // };
  
    //   window.addEventListener('beforeunload', handleTabClose);
}


export {socket, connectWithServer};
