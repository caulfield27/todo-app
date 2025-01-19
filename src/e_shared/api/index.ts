import axios from "axios";
import { BASE_URL } from "../get-env";

const strapi = axios.create({
    baseURL: BASE_URL+'/api'
})


async function getUserTodo(api: string) {
    try{
        return (await strapi.get(api)).data;
    }catch(e){
        console.log('get todoes err: ', e);
        
    }
}

export {strapi, getUserTodo}