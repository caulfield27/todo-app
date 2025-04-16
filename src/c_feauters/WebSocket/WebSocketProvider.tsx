"use client";

import { getUserAttribute } from "@/utils/getUser";
import { createContext, ReactNode, useEffect, useRef, useState } from "react";

interface IContext{
    socket: WebSocket | null,
    activeUsers: Set<number> | null,
}

export const SocketContext = createContext<IContext>({
    socket: null,
    activeUsers: null
});

export const WebSocketProvider = ({children} : {children: ReactNode}) => {
    const webSocketRef = useRef<WebSocket | null>(null);
    const [activeUsers, setActiveUsers] = useState<Set<number>>(new Set())

    useEffect(()=>{  
        webSocketRef.current = new WebSocket("ws://localhost:1337");
        const id = getUserAttribute("id");
        webSocketRef.current.onopen = ()=>{
            console.log('соеденение установлено!');
            webSocketRef.current?.send(JSON.stringify({type: "init", id}));
            webSocketRef.current?.send(JSON.stringify({type: "checkStatus", id}))
        }
        webSocketRef.current.onmessage = (msg)=>{
            const data = JSON.parse(msg.data);
            if(data.type !== "usersStatus") return;
            setActiveUsers(new Set(data.data));
        }

        return ()=>{
            if(webSocketRef.current){
                webSocketRef.current.close()
            }
        }
    },[]);
    
    return <SocketContext.Provider value={{socket: webSocketRef.current, activeUsers}}>
        {children}
    </SocketContext.Provider> 
}
 
