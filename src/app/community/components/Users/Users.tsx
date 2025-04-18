"use client";

import { strapi } from "@/e_shared/api";
import { IChat, IUserData } from "@/e_shared/types/types";
import { apiUrl } from "@/routes";
import { getToken } from "@/utils/getToken";
import { useContext, useEffect, useState } from "react";
import styles from "./Users.module.css";
import { SocketContext } from "@/c_feauters/WebSocket/WebSocketProvider";
import { getUserAttribute } from "@/utils/getUser";
import CommunityLoader from "../CommunityLoader/CommunityLoader";
import UserCard from "../UserCard/UserCard";
import { usePathname, useRouter } from "next/navigation";
import { useCommunityStore } from "../../store/store";

export const Users = () => {
  const {users, setUsers} = useCommunityStore();
  const chats = useCommunityStore((state)=> state.chats);
  const setChats = useCommunityStore((state)=> state.setChats);
  const [loading, setLoading] = useState(false);
  const { socket, activeUsers } = useContext(SocketContext);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    setLoading(true);
    getToken().then((token) => {
      if (token) {
        strapi
          .get(apiUrl.getUsers(getUserAttribute("id")), {
            headers: { Authorization: `Bearer ${token}` },
          })
          .then((res) => {
            setUsers(res?.data ?? []);
          })
          .catch((e) => console.log("get users err: ", e))
          .finally(() => {
            setLoading(false);
          });
      }
    });
  }, []);

  const handleOpenChat = (user: IUserData)=>{
    const params = new URLSearchParams();
    params.set("type", "chat");
    params.set("chat", String(user.id));
    if(!chats.length){
        const newChat: IChat = {
          username: user.username,
          avatar: user.avatar?.url ?? null,
          userId: user.id,
          messages: [],
        }
        setChats([newChat]);
    }
    router.replace(`${pathname}?${String(params)}`);
  } 

  return (
    <div>
      {loading ? (
        <CommunityLoader />
      ) : (
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
      )}
    </div>
  );
};
