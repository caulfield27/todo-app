"use client";

import { IChat, IUserData } from "@/e_shared/types/types";
import { useContext } from "react";
import styles from "./Users.module.css";
import { SocketContext } from "@/c_feauters/WebSocket/WebSocketProvider";
import CommunityLoader from "../CommunityLoader/CommunityLoader";
import UserCard from "../UserCard/UserCard";
import { usePathname, useRouter } from "next/navigation";
import { useCommunityStore } from "../../store/store";

export const Users = () => {
  const chats = useCommunityStore((state)=> state.chats);
  const setChats = useCommunityStore((state)=> state.setChats);
  const setCurrentChat = useCommunityStore((state)=> state.setCurrentChat);
  const {users} = useCommunityStore();
  const { activeUsers } = useContext(SocketContext);
  const router = useRouter();
  const pathname = usePathname();

  const handleOpenChat = (user: IUserData)=>{
    const foundChat = chats.find((chat)=> chat.userId === user.id);
    if(foundChat){
      setCurrentChat(foundChat);
    }else{
      const newChat: IChat = {
        username: user.username,
        avatar: user.avatar?.url ?? null,
        userId: user.id,
        messages: [],
      }
      chats.push(newChat);
      setCurrentChat(newChat);
      setChats(chats);
    };
    const params = new URLSearchParams();
    params.set("type", "chat");
    router.replace(`${pathname}?${params}`);
  } 

  return (
    <div>
        <div className={styles.users_container}>
          {users.map((user) => (
            <UserCard
              handleOpenChat={()=> handleOpenChat(user)}
              key={user.id}
              isOnline={activeUsers?.has(user.id)}
              avatar={user.avatar?.url ?? null}
              name={user.username}
            />
          ))}
        </div>
    </div>
  );
};
