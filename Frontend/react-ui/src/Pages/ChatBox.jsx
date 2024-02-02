import { useState, useEffect } from "react"


import MessageReceived from "../Components/MessageRecieved"; 
import MessageSent from "../Components/MessageSent";
import { connectWithServer, socket} from "../Helpers/SocketHelper";
import { useLocation, useNavigate } from "react-router-dom";
import backImg from "../Assets/Images/back.png";


export default function ChatBox(){
    const {state} = useLocation();
    const navigator = useNavigate();
    const [text, setText] = useState("");
    const [history, setHistory] = useState([]);
    const [userName, setUserName] = useState("");

    useEffect(() => {
        const userName = localStorage.getItem("USER_NAME")
        connectWithServer(userName);
        setUserName(userName);
    }, [])

    // only for debugging purpose
    useEffect(() => {
        console.log(history);
    }, [history]);
    
    useEffect(() => {

        socket.on("responseMessage", (data) => {
            console.log("response ---> ", data);
            setHistory((old) => [...old, {from : data.userName, to : userName, message: data.message, time : data.time}])
        })

        return () => {
         socket.disconnect(); 
        };
    }, [socket]);

    const sendMsgHandler = (e) => {
        e.preventDefault();
        let time = new Date().toLocaleTimeString("en-US", { timeStyle: 'short', hour12: true });
        setHistory((old) => [...old, {from : userName, to : state.targetUserName, message : text, time : time}])
        
        console.log(time, " ----> ");
        socket.emit("message", {from :userName, to : state.targetUserName,  message : text, time : time});
        setText("");
    }

    const logoutHandler = (e) => {
        localStorage.removeItem("USER_NAME");
        socket.disconnect();
        navigator('/');
    }

    const handleBackBtnClk = (e) => {
        navigator('/usersList');
    }

    return(
        <div className="w-screen min-h-screen bg-slate-900 flex flex-col items-center overflow-y-auto ">

            <div className="w-screen flex flex-row justify-evenly bg-slate-600 sticky-with-safari">
                <button className="flex flex-row items-center" onClick={handleBackBtnClk}><img src={backImg} alt="Back" className="w-4 h-4 mr-2" /> Back</button>

                <h1 className="text-center p-4 m-4 font-roboto-mono text-white">{state.targetUserName} <span className="text-green-600">Online</span></h1>
                <button className="bg-red-500 p-4 m-4 rounded" onClick={logoutHandler}>LogOut</button>
            </div>
            
            
            <div className="w-screen m-16 flex-1">
               {history && history.map((obj, index) => {
                    if(obj.from === userName){
                        return <MessageSent message={obj.message} time={obj.time} key={index}/>
                    }else{
                        return <MessageReceived message={obj.message} time={obj.time} key={index}/>
                    }
                })}
            </div>

            <div className="w-full p-4 mt-auto flex  flex-row bg-slate-500">
                <input type="text" className="w-full mr-8 rounded px-2" onChange={(e) => setText(e.target.value)} value={text}/>
                <button className="px-5 py-2 bg-blue-400 rounded" onClick={sendMsgHandler}>Send</button>
            </div>
        </div>
    )
}