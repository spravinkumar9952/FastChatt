
export default class User {
    static users = new Map

    addUser(id, name) {
        users.set(id, {
            name : name 
        })        
    }

    removeUser(id) {
        User.users.delete(id);
    }

    isUserThere(id){
        return User.users.has(id)
    }

    printAvailableUsers(){
        for(let [id , data] of User.users){
            console.log(id , "=>", data);
        }
    }
}