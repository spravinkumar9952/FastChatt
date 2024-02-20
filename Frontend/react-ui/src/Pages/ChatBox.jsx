import { useState, useEffect } from "react"


import MessageReceived from "../Components/MessageRecieved"; 
import MessageSent from "../Components/MessageSent";
import { connectWithServer, socket} from "../Helpers/SocketHelper";
import { useLocation, useNavigate } from "react-router-dom";
import backImg from "../Assets/Images/back.png";
import { currentTime } from "../Helpers/Utils";


export default function ChatBox(){
    const {state} = useLocation();
    const navigator = useNavigate();
    const [text, setText] = useState("");
    const [history, setHistory] = useState([]);
    const [userName, setUserName] = useState("");
    const [base64Image, setBase64Image] = useState('');

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

            let message = "";
            if(data.type == "Image"){
                const uint8Array = new Uint8Array(data.message);
                let image = new Blob([uint8Array], { type: 'image/jpeg' });
                // const base64String = Buffer.from(uint8Array).toString('base64');
                message = URL.createObjectURL(image); 
            }else{
                message = data.message;
            }
            setHistory((old) => [...old, {from : data.userName, to : userName, message: message, type : data.type, time : data.time}])
        })

        return () => {
         socket.disconnect(); 
        };
    }, [socket]);

    const sendMsgHandler = (e) => {
        e.preventDefault();
        
        setHistory((old) => [...old, {from : userName, to : state.targetUserName, message : text, type : "Text", time : currentTime}])
        
        console.log(history);

        socket.emit("message", {from :userName, to : state.targetUserName,  message : text, type : "Text", time : currentTime});
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

    const imageHandler = (event) => {
        const file = event.target.files[0];
        console.log("File => ", file);
        if (file) {
            // const uint8Array = new Uint8Array(file);
            // let image = new Blob([uint8Array], { type: 'image/jpeg' });
            // const base64String = Buffer.from(uint8Array).toString('base64');
            const url = URL.createObjectURL(file); 

            console.log("URL => " + url);

            setHistory((old) => [...old, {from : userName, to : state.targetUserName, message : url, type : "Image", time : currentTime}])
            socket.emit("message", {from :userName, to : state.targetUserName,  message : file, type : "Image", time : currentTime});
        }
        // const file = event.target.files[0];
        // if (file) {
        // const reader = new FileReader();
        // reader.onloadend = () => {
        //     const base64String = reader.result;
        //     setBase64Image(base64String);
        // };
        // reader.readAsDataURL(file);
        // }
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
                        console.log("Obj " , obj);
                        return <MessageSent message={obj.message} time={obj.time} type={obj.type} key={index}/>
                    }else{
                        return <MessageReceived message={obj.message} time={obj.time} type={obj.type} key={index}/>
                    }
                })}
            </div>

        

            <div className="w-full p-4 mt-auto flex  flex-row bg-slate-500">
                
                <input type="text" className="w-full mr-8 rounded px-2"  onChange={(e) => setText(e.target.value)} value={text}/>

                <label f="image_input">Image</label>
                <input className="px-5 py-2 mr-2 bg-blue-400 rounded " id = "image_input" type="file" onChange={imageHandler}/>
                <button className="px-5 py-2 bg-blue-400 rounded" onClick={sendMsgHandler}>Send</button>
            </div>
        </div>
    )
}