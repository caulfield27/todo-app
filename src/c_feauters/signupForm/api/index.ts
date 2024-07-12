import { IUserData } from "../model";
import axios from "axios";

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


export { postUser, getUsers }
