import { useState, useEffect } from "react"
import io from "socket.io-client"

const socket = io("http://localhost:5000");

export default function ChatBox(){
    const [text, setText] = useState("");
    
    useEffect(() => {
        socket.on('connect', () => {
          console.log('Connected to the server');
          socket.emit('message', 'Hello, server!');
        });

        return () => {
          socket.disconnect(); 
        };
    }, []);

    const sendMsgHandler = () => {

    }

    return(
        <div className="w-1/1 h-2/3 m-16 bg-grey-100 flex">
            <div className="w-full p-4 mt-auto flex flex-1 flex-row">
                <input type="text" className="w-full mr-8 rounded px-2" onChange={(e) => setText(e.target.value)}/>
                <button className="px-5 py-2 bg-blue-400 rounded" onClick={sendMsgHandler}>Send</button>
            </div>
        </div>
    )
}