import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { connectWithServer } from "../Helpers/SocketHelper";

export default function Home() {

    const navigator = useNavigate();
    const [userName, setUserName] = useState("");

    useEffect(() => {
        const name = localStorage.getItem("USER_NAME");
        if (name) {
            console.log("name in Home ", name);
            connectWithServer(name);
            navigator("usersList")  
        }
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();

        localStorage.setItem("USER_NAME", userName);
        connectWithServer(userName);
        
        navigator("usersList")
    }

    return (
        <div className="w-screen h-screen flex flex-col items-center bg-slate-900">

            <div className="p-10 m-auto bg-slate-500 rounded-lg shadow-lg">
                <h1 className="text-center text text-yellow-500">Welcome to FastChat!</h1>

                <form action="" onSubmit={handleSubmit} className="flex flex-col items-center" autoComplete="off">
                    <input type="text" name="userName" id="userName" className="p-4 m-2 rounded-sm" placeholder="Enter UserName" onChange= {e => setUserName(e.target.value)} value={userName}/>
                    <button type="submit" className="bg-green-500 rounded px-4 py-2 mt-4">Enter</button>
                </form>
            </div>
        </div>
    )
}