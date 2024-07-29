import { ITodo } from "@/store/addTask/addTask";
import axios from "axios";

export interface IUserData{
    id: number,
    name:string,
    email: string,
    password: string
}

export interface ITodoPostData{
    userId: number,
    todo: ITodo
}

async function postUser(userData: IUserData, url:string){
    try{
        await axios.post(url,userData)
    }catch(e){
        console.log(`postError: ${e}`);
        
    }finally{
        console.log('done');
        
    }

} 

async function getUsers(url:string) {
    try{
        const response = await axios.get(url)
        return response.data
    }catch(e){
        console.log(e);
        
    }finally{
        console.log('done');
        
    }
}

async function postTodo(todo:ITodoPostData, url:string){
    try{
        await axios.post(url, todo)
    }catch(e){
        console.log(e);
    }
}



export {postTodo, postUser, getUsers }