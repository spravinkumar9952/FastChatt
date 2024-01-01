
export default class User {
    static users = new Map

    static addUser(usnerName, socketID) {
        User.users.set(usnerName, socketID);     
    }

    static removeUser(userName) {
        User.users.delete(userName);
    }

    static findUserByUserName(userName){
        return User.users.has(userName)
    }

    static getSocketID(userName){
        return User.users.get(userName);
    }

    static printAvailableUsers(){
        for(let [userName, socketID] of User.users){
            console.log(userName , "=>", socketID);
        }
    }
}