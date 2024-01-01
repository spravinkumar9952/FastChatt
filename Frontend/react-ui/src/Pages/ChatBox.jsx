import { useState, useEffect } from "react"


import MessageReceived from "../Components/MessageRecieved"; 
import MessageSent from "../Components/MessageSent";
import { connectWithServer, socket} from "../Helpers/SocketHelper";
import { useLocation, useNavigate } from "react-router-dom";

export default function ChatBox(){
    const {state} = useLocation();
    const navigator = useNavigate();
    const [text, setText] = useState("");
    const [history, setHistory] = useState([]);

    useEffect(() => {
        connectWithServer(state.userName);
    }, [])

    // only for debugging purpose
    useEffect(() => {
        console.log(history);
    }, [history]);
    
    useEffect(() => {

        socket.on("responseMessage", (data) => {
            console.log("response ---> ", data);
            setHistory((old) => [...old, {from : data.userName, to : state.userName, message: data.message}])
        })

        return () => {
         // socket.disconnect(); 
        };
    }, [socket]);

    const sendMsgHandler = (e) => {
        e.preventDefault();
        setHistory((old) => [...old, {from : state.userName, to : state.userName, message : text}])
        socket.emit("message", {from : state.userName, to : state.userName, message : text});
        setText("");
    }

    const logoutHandler = (e) => {
        localStorage.removeItem("USER_NAME");
        navigator('/');
    }

    return(
        <>
            <button onClick={logoutHandler} className="bg-red-500 p-4 m-4 rounded">LogOut</button>
            <h1>Hello {state.userName}!</h1>
            <div className="w-1/1 h-2/3 m-16 bg-grey-100">
               {history && history.map((obj) => {
                    if(obj.from === state.userName){
                        return <MessageSent message={obj.message}/>
                    }else{
                        return <MessageReceived message={obj.message}/>
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