"use client";
import { Avatar } from "@mui/material";
import { useCommunityStore } from "../../store/store";
import styles from "./CurrentChat.module.css";
import { BASE_URL } from "@/e_shared/get-env";
import {
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { IDetailedMessage } from "@/e_shared/types/types";
import { getUserAttribute } from "@/utils/getUser";
import { handleMessageChange, handlePressEnter, handleSendMsg } from "./actions";
import { SocketContext } from "@/c_feauters/WebSocket/WebSocketProvider";
import SendIcon from "@mui/icons-material/Send";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { createPortal } from "react-dom";

interface Props {
  setMessage: Dispatch<SetStateAction<IDetailedMessage>>;
  message: IDetailedMessage;
  isMobile?: boolean;
  isTablet?: boolean;
}

export const CurrentChat = ({ setMessage, message, isMobile, isTablet }: Props) => {
  const { currentChat, setCurrentChat } = useCommunityStore();
  const { socket } = useContext(SocketContext);
  const messagesContainerRef = useRef<HTMLDivElement | null>(null);
  const msgCanvas = useRef<HTMLDivElement | null>(null);
  const [readyToSend, setReadyToSend] = useState(false);

  useEffect(() => {
    if (currentChat && currentChat.userId !== message.to) {
      setMessage((prev) => ({ ...prev, to: currentChat.userId }));
    }
    const messagesContainer = messagesContainerRef.current;
    if (messagesContainer) {
      messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }
  }, [currentChat]);

  useLayoutEffect(() => {
    const canvas = msgCanvas.current;
    const msg_container = messagesContainerRef.current;
    if (canvas && (!isMobile && !isTablet)) {
      const validOffset = isMobile ? 280 : 320;
      canvas.style.height = `calc(100vh - ${validOffset}px)`;
    }
    if (msg_container) {
      msg_container.style.height = `calc(100vh - ${(isMobile || isTablet) ? "165" : "320"}px)`;
    }
  }, []);

  return ((isMobile || isTablet) ? createPortal(<div ref={msgCanvas} className={styles.chat_canvas_mobile}>
    <div className={styles.cnavas_container}>
      <div className={styles.messages_wrapper}>
        <div className={styles.header_container}>
          {(isMobile || isTablet) && (
            <button onClick={() => setCurrentChat(null)} className={styles.go_back_btn}>
              <ArrowBackIcon />
            </button>
          )}
          <header className={styles.messages_header}>
            <div className={styles.chat_messages_avatar_wrapper}>
              {(isMobile || isTablet) && <span>{currentChat?.username}</span>}
              {currentChat?.avatar ? (
                <Avatar
                  alt={`${currentChat.username} avatar`}
                  src={BASE_URL + currentChat.avatar}
                />
              ) : (
                <Avatar>{currentChat?.username[0].toLocaleUpperCase()}</Avatar>
              )}
              {!isMobile && !isTablet && <span>{currentChat?.username}</span>}
            </div>
          </header>
        </div>
        <div ref={messagesContainerRef} className={styles.messages_container}>
          {currentChat?.messages.map((message) => {
            return (
              <p
                key={message.id}
                className={`${styles.message} ${message.from === getUserAttribute("id") ? styles.send_msg : styles.get_msg
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
  </div>, document.body) : <div ref={msgCanvas} className={styles.chat_canvas}>
    <div className={styles.cnavas_container}>
      <div className={styles.messages_wrapper}>
        <div className={styles.header_container}>
          {(isMobile || isTablet) && (
            <button onClick={() => setCurrentChat(null)} className={styles.go_back_btn}>
              <ArrowBackIcon />
            </button>
          )}
          <header className={styles.messages_header}>
            <div className={styles.chat_messages_avatar_wrapper}>
              {(isMobile || isTablet) && <span>{currentChat?.username}</span>}
              {currentChat?.avatar ? (
                <Avatar
                  alt={`${currentChat.username} avatar`}
                  src={BASE_URL + currentChat.avatar}
                />
              ) : (
                <Avatar>{currentChat?.username[0].toLocaleUpperCase()}</Avatar>
              )}
              {!isMobile && !isTablet && <span>{currentChat?.username}</span>}
            </div>
          </header>
        </div>
        <div ref={messagesContainerRef} className={styles.messages_container}>
          {currentChat?.messages.map((message) => {
            return (
              <p
                key={message.id}
                className={`${styles.message} ${message.from === getUserAttribute("id") ? styles.send_msg : styles.get_msg
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
  </div>


  );
};
