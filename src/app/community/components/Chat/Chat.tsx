import { SocketContext } from "@/c_feauters/WebSocket/WebSocketProvider";
import { useContext, useEffect, useRef, useState } from "react";
import { Avatar } from "@mui/material";
import { BASE_URL } from "@/e_shared/get-env";
import styles from "./Chat.module.css";
import { useCommunityStore } from "../../store/store";
import { getUserAttribute } from "@/utils/getUser";
import { IDetailedMessage } from "@/e_shared/types/types";
import { CurrentChat } from "./CurrentChat";
import { NoChats } from "./NoChats";
import { useGlobalStore } from "@/store/global/global";
import { handleUsername } from "@/utils/handleUsername";

export const Chat = () => {
  const { activeUsers } = useContext(SocketContext);
  const { currentChat, setCurrentChat, chats } = useCommunityStore();
  const isMobile = useGlobalStore((state) => state.isMobile);
  const isTablet = useGlobalStore((state)=> state.isTablet);
  const [message, setMessage] = useState<IDetailedMessage>({
    from: {
      username: "",
      avatar: "",
      id: null,
    },
    to: currentChat?.userId ?? null,
    message: "",
  });

  useEffect(() => {
    setMessage((prev) => ({
      ...prev,
      from: {
        username: getUserAttribute("username"),
        avatar: getUserAttribute("avatar"),
        id: getUserAttribute("id"),
      },
    }));
  }, []);

  return (
    <div className={styles.chat_container}>
      {chats.length ? (
        <>
          {currentChat && (isMobile || isTablet) ? null : (
            <aside className={isMobile || isTablet ? styles.chat_aside_mobile : styles.chat_aside}>
              <div className={styles.chat_aside_content}>
                {chats.map((chat) => {
                  return (
                    <div
                      role="button"
                      onClick={() => setCurrentChat(chat)}
                      key={chat.userId}
                      className={`${styles.chat_article} ${
                        currentChat?.userId === chat.userId ? styles.active_chat : ""
                      }`}
                    >
                      {chat.avatar ? (
                        <Avatar alt={`${chat.username} avatar`} src={BASE_URL + chat.avatar} />
                      ) : (
                        <Avatar>{chat.username[0].toLocaleUpperCase()}</Avatar>
                      )}
                      <div className={styles.user_status_wrapper}>
                        <span className={styles.name_span}>{handleUsername(chat.username)}</span>
                        <span className={styles.status_span}>
                          {activeUsers?.has(chat.userId) ? "В сети" : "Не в сети"}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </aside>
          )}
          {currentChat && (
            <CurrentChat setMessage={setMessage} message={message} isMobile={isMobile} />
          )}
        </>
      ) : (
        <NoChats />
      )}
    </div>
  );
};
