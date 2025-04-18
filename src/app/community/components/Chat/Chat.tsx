import { SocketContext } from "@/c_feauters/WebSocket/WebSocketProvider";
import { useSearchParams } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { getChats } from "./api";
import CommunityLoader from "../CommunityLoader/CommunityLoader";
import { Avatar } from "@mui/material";
import { BASE_URL } from "@/e_shared/get-env";
import styles from "./Chat.module.css";
import { useCommunityStore } from "../../store/store";
import SendIcon from "@mui/icons-material/Send";
import { handleMessageChange, handlePressEnter, handleSendMsg } from "./actions";
import { getUserAttribute } from "@/utils/getUser";
import { IDetailedMessage, IMessage } from "@/e_shared/types/types";

export const Chat = () => {
  const searchParams = useSearchParams();
  const { socket, activeUsers } = useContext(SocketContext);
  const { currentChat, setCurrentChat, chats, setChats } = useCommunityStore();
  const [message, setMessage] = useState<IDetailedMessage>({
    from: {
      username: "",
      avatar: "",
      id: null,
    },
    to: Number(searchParams.get("chat")) ?? null,
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [readyToSend, setReadyToSend] = useState(false);

  useEffect(() => {
    setMessage((prev) => ({
      ...prev,
      from: {
        username: getUserAttribute("username"),
        avatar: getUserAttribute("avatar"),
        id: getUserAttribute("id"),
      },
    }));
    getChats(setChats, setLoading, searchParams.get("chat"), setCurrentChat);
  }, []);

  return loading ? (
    <CommunityLoader />
  ) : (
    <div className={styles.chat_container}>
      <aside className={styles.chat_aside}>
        <div className={styles.chat_aside_content}>
          {chats.map((chat) => (
            <div
              role="button"
              onClick={() => setCurrentChat(chat)}
              key={chat.userId}
              className={styles.chat_article}
            >
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
        </div>
      </aside>
      <div className={styles.chat_canvas}>
        {currentChat && (
          <div className={styles.cnavas_container}>
            <div>
              <div className={styles.header_container}>
                <header className={styles.messages_header}>
                  <div className={styles.chat_messages_avatar_wrapper}>
                    {currentChat.avatar ? (
                      <Avatar
                        alt={`${currentChat.username} avatar`}
                        src={BASE_URL + currentChat.avatar}
                      />
                    ) : (
                      <Avatar>{currentChat.username[0].toLocaleUpperCase()}</Avatar>
                    )}
                    <span>{currentChat.username}</span>
                  </div>
                </header>
              </div>
              <div className={styles.messages_container}>
                {currentChat.messages.map((message) => {
                  return (
                    <p
                      key={message.id}
                      className={`${styles.message} ${
                        message.from === getUserAttribute("id") ? styles.send_msg : styles.get_msg
                      }`}
                    >
                      {message.message}
                    </p>
                  );
                })}
              </div>
            </div>
            <div className={styles.send_message_container}>
              <textarea
                value={message.message}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                  handleMessageChange(e, setReadyToSend, setMessage)
                }
                autoFocus
                placeholder="Сообщение..."
                onKeyDown={(e: React.KeyboardEvent<HTMLTextAreaElement>) =>
                  handlePressEnter(
                    e,
                    readyToSend,
                    socket,
                    message,
                    setMessage,
                    currentChat,
                    setCurrentChat
                  )
                }
                className={styles.message_input}
              />
              <div className={styles.send_btn_wrapper}>
                {readyToSend && (
                  <button
                    className={styles.send_btn}
                    onClick={() =>
                      handleSendMsg(currentChat, setCurrentChat, message, setMessage, socket)
                    }
                  >
                    <SendIcon style={{ color: "#070abe" }} />
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
