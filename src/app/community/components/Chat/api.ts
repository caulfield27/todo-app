import { strapi } from "@/e_shared/api";
import { IChat } from "@/e_shared/types/types";
import { apiUrl } from "@/routes";
import { getToken } from "@/utils/getToken";
import { getUserAttribute } from "@/utils/getUser";
import { Dispatch, SetStateAction } from "react";

export function getChats(
    setChats: (chats: IChat[])=> void,
    setLoading: Dispatch<SetStateAction<boolean>>,
    chatId: string | null,
    setCurrentChat : (newChat: IChat | null)=> void
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
                const chats = res?.data?.data[0]?.chats;
                if(chats){
                    setChats(chats);
                    if(chatId){
                        const currentChat = chats.find((chat: IChat)=> chat.userId === Number(chatId));        
                        setCurrentChat(currentChat || null);
                    }

                }
            })
            .catch((e)=> console.log('get chats err: ', e))
            .finally(()=> setLoading(false))
        }
    })
}