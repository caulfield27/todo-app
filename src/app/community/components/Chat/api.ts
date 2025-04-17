import { strapi } from "@/e_shared/api";
import { IChat } from "@/e_shared/types/types";
import { apiUrl } from "@/routes";
import { getToken } from "@/utils/getToken";
import { getUserAttribute } from "@/utils/getUser";
import { Dispatch, SetStateAction } from "react";

export function getChats(
    setChats: Dispatch<SetStateAction<IChat[]>>,
    setLoading: Dispatch<SetStateAction<boolean>>
){
    setLoading(true);
    getToken().then((token)=>{
        if(token){
            strapi.get(apiUrl.getChats(getUserAttribute("id")), {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            .then((res)=>{
                setChats(res?.data?.data[0]?.chats || []);
            })
            .catch((e)=> console.log('get chats err: ', e))
            .finally(()=> setLoading(false))
        }
    })
}