import { IChat, IUserData } from "@/e_shared/types/types";
import { create } from "zustand";

interface IState{
    currentChat: IChat | null,
    chats: IChat[],
    users: IUserData[],
}

interface Actions{
    setCurrentChat: (payload: IChat | null)=> void,
    setChats: (chats: IChat[])=> void,
    setUsers: (users: IUserData[])=> void
}

export const useCommunityStore = create<IState & Actions>((set)=> ({
    currentChat: null,
    chats: [],
    users: [],
    setUsers: (payload)=> set({users: payload}), 
    setChats: (chats)=> set({chats: chats}),
    setCurrentChat: (payload)=> set({currentChat: payload}) 
}))