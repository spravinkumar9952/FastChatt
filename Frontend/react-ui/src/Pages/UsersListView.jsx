import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { connectWithServer } from "../Helpers/SocketHelper";


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


    return (
        <div className="w-screen">
            {
                usersList && usersList.map((obj, index) => {
                    console.log(index);
                    return (
                        <div className="w-9/12 p-2 bg-slate-200 rounded-md m-2" key={index} onClick={(e) => userClickHandler(e,index)}>
                            <h4 className="text-center">{obj.user_name}</h4>
                        </div>
                    )
                })
            }
        </div>
    )
}