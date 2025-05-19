"use client";

import { IChat, IUserData } from "@/e_shared/types/types";
import { useContext } from "react";
import styles from "./Users.module.css";
import { SocketContext } from "@/c_feauters/WebSocket/WebSocketProvider";
import UserCard from "../UserCard/UserCard";
import { usePathname, useRouter } from "next/navigation";
import { useCommunityStore } from "../../store/store";

export const Users = () => {
  const chats = useCommunityStore((state) => state.chats);
  const setChats = useCommunityStore((state) => state.setChats);
  const { setCurrentChat, setCurrentComponent } = useCommunityStore();

  const { users } = useCommunityStore();
  const { activeUsers } = useContext(SocketContext);
  const activeUsersList = users.filter((user) => activeUsers?.has(user.id));

  const handleOpenChat = (user: IUserData) => {
    const foundChat = chats.find((chat) => chat.userId === user.id);
    if (foundChat) {
      setCurrentChat(foundChat);
    } else {
      const newChat: IChat = {
        username: user.username,
        avatar: user.avatar?.url ?? null,
        userId: user.id,
        messages: [],
      };
      chats.push(newChat);
      setCurrentChat(newChat);
      setChats(chats);
    }
    setCurrentComponent("chat");
  };

  return (
    <div>
      <div className={styles.users_container}>
        {activeUsersList.length ? (
          activeUsersList.map((user: IUserData) => {
            return (
              <UserCard
                handleOpenChat={() => handleOpenChat(user)}
                key={user.id}
                isOnline={activeUsers?.has(user.id)}
                avatar={user.avatar?.url ?? null}
                name={user.username}
              />
            );
          })
        ) : (
          <span className={styles.no_users_span}>{`На данный момент нет пользователей онлайн :(`}</span>
        )}
      </div>
    </div>
  );
};
