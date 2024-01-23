

import DBConnection from "./PGBridge.js";

const addUsers = async (userName, socketID) => {
    try{
        const query = "INSERT INTO users(user_name, socket_id) VALUES($1, $2) RETURNING *";
        const values = [userName, socketID];

        const result = await DBConnection.query(query, values);
    }catch(e){
        console.log("Not able to insert");
        updateUserSocketID(userName, socketID);
    }
}

const updateUserSocketID =  async (userName, socketID) => {
    try{
        const query = "UPDATE users SET socket_Id = $1 where user_name = $2";
        const values = [socketID, userName];

        const result = await DBConnection.query(query, values);
    }catch(e){
        console.log(e);
        console.log("Not able to update " + userName + " " + socketID);
    }
}


const getUsers = async (userName) => {
    try{
        const query = "SELECT * FROM users";
        const values = []

        const result = await DBConnection.query(query, values);
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
        return result;
    } catch (error) {
        console.log("Error in while get users by socket id");
    }
}


const deleteUserBySocketID = async (socketID) => {
    try{
        const query = "DELETE FROM users WHERE socket_id = $1";
        const values = [socketID];

        const result = await DBConnection.query(query, values);
        return result;
    }catch(err){
        console.log("Error in delete user by socket id");
    }
}

const deleteUserByName = async (userName) => {
    try{
        const query = "DELETE FROM users WHERE user_name = $1";
        const values = [userName];

        const result = await DBConnection.query(query, values);
        return result;
    }catch(err){
        console.log("Error in delete user by name");
    }
}



export {addUsers, getUsers, getUserSocketIDByUserName, deleteUserBySocketID, deleteUserByName}