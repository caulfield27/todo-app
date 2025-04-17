import { SocketContext } from "@/c_feauters/WebSocket/WebSocketProvider";
import { IChat, IMessage } from "@/e_shared/types/types";
import { useSearchParams } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { getChats } from "./api";
import CommunityLoader from "../CommunityLoader/CommunityLoader";
import { Avatar } from "@mui/material";
import { BASE_URL } from "@/e_shared/get-env";
import styles from "./Chat.module.css";

export const Chat = () => {
  const searchParams = useSearchParams();
  const { socket, activeUsers } = useContext(SocketContext);
  const [currentChat, setCurrentChat] = useState(searchParams.get("chat") || null);
  const [chats, setChats] = useState<IChat[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getChats(setChats, setLoading);
  }, []);

  return loading ? (
    <CommunityLoader />
  ) : (
    <div className={styles.chat_container}>
      <aside className={styles.chat_aside}>
        {chats.map((chat) => (
          <div key={chat.userId} className={styles.chat_article}>
            {chat.avatar ? (
              <Avatar alt={`${chat.username} avatar`} src={BASE_URL + chat.avatar} />
            ) : (
              <Avatar>{chat.username[0].toLocaleUpperCase()}</Avatar>
            )}
            <div className={styles.user_status_wrapper}>
              <span className={styles.name_span}>{chat.username}</span>
              <span className={styles.status_span}>
                {activeUsers?.has(chat.userId) ? "В сети" : "Не в сети"}
              </span>
            </div>
          </div>
        ))}
      </aside>
      <div className={styles.chat_canvas}></div>
    </div>
  );
};
