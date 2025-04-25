"use client";

import { useCommunityStore } from "@/app/community/store/store";
import { strapi } from "@/e_shared/api";
import { IChat, IDetailedMessage } from "@/e_shared/types/types";
import { apiUrl } from "@/routes";
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
  const addMessage = useCommunityStore((state) => state.addMessage);
  const chats = useCommunityStore((state) => state.chats);
  const chatsRef = useRef<IChat[] | null>(null);

  useEffect(() => {
    chatsRef.current = chats;
  }, [chats]);

  useEffect(() => {
    webSocketRef.current = new WebSocket(
      process.env.NEXT_PUBLIC_WS_SERVER ?? "wss://todo-app-cms.onrender.com"
    );
    const ws = webSocketRef.current;
    const id = getUserAttribute("id");
    ws.onopen = () => {
      console.log("соеденение установлено!");
      ws.send(JSON.stringify({ type: "init", id }));
      ws.send(JSON.stringify({ type: "checkStatus", id }));
    };
    ws.onmessage = (msg) => {
      const data = JSON.parse(msg.data);
      switch (data.type) {
        case "usersStatus":
          setActiveUsers(new Set(data.data));
          break;
        case "message":
          const msg: IDetailedMessage = data?.data;
          addMessage(msg);
          break;
        case "getId":
          localStorage.setItem("chatId", data.id);
      }
    };

    const handleBeforeUnload = () => {
      ws.send(
        JSON.stringify({
          type: "save",
          chatId: localStorage.getItem("chatId"),
          chats: chatsRef.current,
        })
      );
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => {
      ws.close();
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  return (
    <SocketContext.Provider value={{ socket: webSocketRef.current, activeUsers }}>
      {children}
    </SocketContext.Provider>
  );
};
