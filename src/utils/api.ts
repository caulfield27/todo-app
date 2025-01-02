"use server"

import { ITodo } from "@/store/addTask/addTask";
import axios from "axios";
import { revalidatePath } from "next/cache";
import { instance } from "./services";

export interface IUserData{
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


async function postTodo(todo:ITodoPostData, url:string){
    try{
        let res = await instance.post(url, todo);
        return res.status;
    }catch(e){
        console.log(e);
        
    }
}

async function getTodoes(url: string,) {
    try{
        const response = await axios.get(url)
        return response.data
    }catch(e){
        console.log(e);
        
    }    
}



export {postTodo, postUser,  getTodoes}