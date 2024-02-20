import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { connectWithServer, socket } from "../Helpers/SocketHelper";


const getUsersURL = "http://localhost:5000/active/users"

export default function UserListView() {
    const navigator = useNavigate();
    const [usersList, setUserList] = useState([]);

    useEffect(() => {

        const userName = localStorage.getItem("USER_NAME")

        connectWithServer(userName);

        axios.get(getUsersURL).then((resp) => {
            console.log("UserListRes", resp);
            setUserList(resp.data);
        }).catch(err => {
            console.log(err);
        })
    }, []);

    const userClickHandler = (e, index) => {
        console.log(index, " Index")
        navigator("/chat", {
            state : {
                targetUserName : usersList[index].user_name
            ,   targetUserSocketID : usersList[index].socket_id
            }
        })
    }

    const logoutHandler = () => {
        localStorage.removeItem("USER_NAME");
        socket.disconnect();
        navigator("/");
    }

    const RefreshHandler = () => {
        axios.get(getUsersURL).then((resp) => {
            console.log("UserListRes", resp);
            setUserList(resp.data);
        }).catch(err => {
            console.log(err);
        })
    }

    console.log(usersList, "UsersList")
    return (
        <div className="w-screen min-h-screen flex flex-col items-center bg-slate-900">
           
           <div className="m-auto flex flex-col items-center">
                {
                    usersList && usersList.map((obj, index) => {
                        console.log(index);
                        return (
                            <div className="w-80 p-2 bg-slate-200 rounded-md m-2" key={index} onClick={(e) => userClickHandler(e,index)}>
                                <h4 className="text-center">{obj.user_name}</h4>
                            </div>
                        )
                    })
                }
        
                {
                    (!usersList.length) && <h1 className="m-10 text-white">No Active Users are there!</h1>
                }
                <button onClick={RefreshHandler} className="p-2 m-2 text-center bg-gray-500 w-60 rounded-md hover:first-letter:first-line:marker:">Refresh</button>
                <button onClick={logoutHandler} className="p-2 m-2 text-center bg-red-400 w-60 rounded-md hover:first-letter:first-line:marker:">Log Out</button>
            </div>
        </div>
    )
}