export function getUserName(){
    const user = localStorage.getItem("user");
    if(user){
        return JSON.parse(user).username;
    }
    return null;
}