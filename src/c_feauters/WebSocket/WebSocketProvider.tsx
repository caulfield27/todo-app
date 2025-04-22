"use client";

import { useCommunityStore } from "@/app/community/store/store";
import { IDetailedMessage, IMessage } from "@/e_shared/types/types";
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

  useEffect(() => {
    webSocketRef.current = new WebSocket(
      process.env.NEXT_PUBLIC_WS_SERVER ?? "ws://todo-app-cms.onrender.com"
    );
    const audio = new Audio("/message.wav");
    const id = getUserAttribute("id");
    webSocketRef.current.onopen = () => {
      console.log("соеденение установлено!");
      webSocketRef.current?.send(JSON.stringify({ type: "init", id }));
      webSocketRef.current?.send(JSON.stringify({ type: "checkStatus", id }));
    };
    webSocketRef.current.onmessage = (msg) => {
      if (audio) {
        audio.play();
      }
      const data = JSON.parse(msg.data);
      switch (data.type) {
        case "usersStatus":
          setActiveUsers(new Set(data.data));
          break;
        case "message":
          const msg: IDetailedMessage = data?.data;
          addMessage(msg);
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
