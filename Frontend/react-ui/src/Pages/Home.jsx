import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {

    const navigator = useNavigate();

    useEffect(() => {
        const name = localStorage.getItem("USER_NAME");
        if (name) {
            console.log("name in Home ", name);
            navigator("/chat", {
                state : {
                    userName: name
                }
            });
        }

    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();

        const userName = e.target.userName.value;
        localStorage.setItem("USER_NAME", userName);
        
        navigator("/chat", { 
            state : {
                userName: userName 
            }
        });
    }

    return (
        <div className="w-screen h-screen">
            <h1 className="text-center font-extrabold">Log In to Chat Fastt</h1>

            <form action="" onSubmit={handleSubmit} className="flex flex-col items-center" autoComplete="off">
                <label htmlFor="userName" className="font-bold">User Name</label>
                <input type="text" name="userName" id="userName" className="border border-gray-600" />

                <button type="submit" className="bg-green-500 rounded px-4 py-2 mt-4">Enter</button>
            </form>
        </div>
    )
}