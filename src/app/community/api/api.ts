import { strapi } from "@/e_shared/api";
import { IChat, IUserData } from "@/e_shared/types/types";
import { apiUrl } from "@/routes";
import { getToken } from "@/utils/getToken";
import { getUserAttribute } from "@/utils/getUser";
import { Dispatch, SetStateAction, use } from "react";

export async function getCommunityData(
    setUsers: (users: IUserData[])=> void,
    setChats: (chats: IChat[])=> void,
    setLoading: Dispatch<SetStateAction<boolean>>   
){
    setLoading(true);
    const token = await getToken();
    if(token){
        const apiConfig ={
            headers: {
                Authorization: `Bearer ${token}`
            }
        };
        const userId = getUserAttribute("id");
        const usersPromise = strapi.get(apiUrl.getUsers(userId), apiConfig);
        const chatsPromise = strapi.get(apiUrl.getChats(userId), apiConfig);
        Promise.allSettled([usersPromise, chatsPromise]).then((res)=>{
            const [usersResponse, chatsResponse] = res;
            if(usersResponse.status === "fulfilled"){
                setUsers(usersResponse.value.data ?? []);
            };
            if(chatsResponse.status === "fulfilled"){
                setChats(chatsResponse.value.data?.data ?? [])
            }
        }).catch((err)=>{
            console.log('get community data err: ', err);
        }).finally(()=> {setLoading(false)});
    }else{
        setLoading(false);
    }
}