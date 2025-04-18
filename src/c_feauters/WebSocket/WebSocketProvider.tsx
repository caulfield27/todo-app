"use client";

import { useCommunityStore } from "@/app/community/store/store";
import { IChat } from "@/e_shared/types/types";
import { useGlobalStore } from "@/store/global/global";
import { getUserAttribute } from "@/utils/getUser";
import { createContext, ReactNode, useEffect, useRef, useState } from "react";

interface IContext {
  socket: WebSocket | null;
  activeUsers: Set<number> | null;
}

export const SocketContext = createContext<IContext>({
  socket: null,
  activeUsers: null,
});

export const WebSocketProvider = ({ children }: { children: ReactNode }) => {
  const webSocketRef = useRef<WebSocket | null>(null);
  const [activeUsers, setActiveUsers] = useState<Set<number>>(new Set());
  const chats = useCommunityStore((state) => state.chats);
  const setChats = useCommunityStore((state) => state.setChats);
  const currentChat = useCommunityStore((state) => state.currentChat);
  const setCurrentChat = useCommunityStore((state) => state.setCurrentChat);

  useEffect(() => {
    webSocketRef.current = new WebSocket("ws://localhost:1337");
    const id = getUserAttribute("id");
    webSocketRef.current.onopen = () => {
      console.log("соеденение установлено!");
      webSocketRef.current?.send(JSON.stringify({ type: "init", id }));
      webSocketRef.current?.send(JSON.stringify({ type: "checkStatus", id }));
    };
    webSocketRef.current.onmessage = (msg) => {
      const data = JSON.parse(msg.data);
      switch (data.type) {
        case "usersStatus":
          setActiveUsers(new Set(data.data));
          break;
        case "message":
            const msg = data?.data;
            console.log('msg: ', msg);
          const updatedMsg = { ...msg, from: msg?.from?.id };
          if (currentChat) {
            const { messages } = currentChat;
            messages.push(updatedMsg);
            const updatedChat = { ...currentChat, messages };
            setCurrentChat(updatedChat);
          } else {
            const newChat: IChat = {
              username: msg?.from?.username ?? "",
              avatar: msg?.from?.avatar ?? null,
              userId: msg?.from?.id,
              messages: [],
            };
            newChat.messages.push(updatedMsg);
            setCurrentChat(newChat);
            setChats([...chats, newChat]);
          }
          break;
      }
    };

    return () => {
      if (webSocketRef.current) {
        webSocketRef.current.close();
      }
    };
  }, []);

  return (
    <SocketContext.Provider value={{ socket: webSocketRef.current, activeUsers }}>
      {children}
    </SocketContext.Provider>
  );
};
