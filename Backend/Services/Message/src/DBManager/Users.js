

import DBConnection from "./PGBridge.js";

const addUsers = async (userName, socketID) => {
    try{
        const query = "INSERT INTO users(user_name, socket_id) VALUES($1, $2) RETURNING *";
        const values = [userName, socketID];

        const result = await DBConnection.query(query, values);
        console.log(result);
    }catch(e){
        console.log("Not able to insert");
    }
}

const getUsers = async (userName) => {
    try{
        const query = "SELECT * FROM users";
        const values = []

        const result = await DBConnection.query(query, values);
        console.log(result);
        return result;
    }catch(e){
        console.log("Not able to fetch data");
    }
}

const getUserSocketIDByUserName = async (userName) => {
    try {
        const query = "SELECT socket_id FROM users WHERE user_name = $1";
        const values = [userName]

        const result = await DBConnection.query(query, values);
        console.log(result);
        return result;
    } catch (error) {
        
    }
}


const deleteUserBySocketID = async (socketID) => {
    try{
        const query = "DELETE FROM users WHERE socket_id == $1";
        const values = [socketID];

        const result = await DBConnection.query(query, values);
        console.log(result);
        return result;
    }catch(err){

    }
}

export {addUsers, getUsers, getUserSocketIDByUserName, deleteUserBySocketID}