import { useState, useEffect } from "react"


import MessageReceived from "./MessageRecieved"; 
import MessageSent from "./MessageSent";
import { connectWithServer, socket} from "../Helpers/SocketHelper";
import { useNavigate } from "react-router-dom";

export default function ChatBox({userName}){
    const navigator = useNavigate();
    const [text, setText] = useState("");
    const [history, setHistory] = useState([]);

    useEffect(() => {
        connectWithServer(userName);
    }, [])
    
    useEffect(() => {

        socket.on("responseMessage", (data) => {
            console.log("response ---> ", data);
            setHistory((old) => [...old, {author : "reciever", data : data}])
        })

        return () => {
         // socket.disconnect(); 
        };
    }, [socket]);

    const sendMsgHandler = (e) => {
        e.preventDefault();
        setHistory((old) => [...old, {author : userName, data : text}])
        socket.emit("message", {data : text, to : userName});
    }

    const logoutHandler = (e) => {
        localStorage.removeItem("USER_NAME");
        navigator('/');
    }

    return(
        <>
            <button onClick={logoutHandler} className="bg-red-500 p-4 m-4 rounded">LogOut</button>
            <div className="w-1/1 h-2/3 m-16 bg-grey-100">
               {history && history.map((obj) => {
                    if(obj.author === "sender"){
                        return <MessageSent message={obj.data}/>
                    }else{
                        return <MessageReceived message={obj.data}/>
                    }
                })}
            </div>
            <div className="w-full p-4 mt-auto flex flex-1 flex-row bg-grey-100">
                <input type="text" className="w-full mr-8 rounded px-2" onChange={(e) => setText(e.target.value)}/>
                <button className="px-5 py-2 bg-blue-400 rounded" onClick={sendMsgHandler}>Send</button>
            </div>
        </>
    )
}