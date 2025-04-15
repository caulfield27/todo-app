"use client"

import PagesContainer from "@/layouts/pagesContainer/pagesContainer";
import Wrapper from "@/layouts/wrappepr/wrapper";
import { getUserAttribute } from "@/utils/getUser";
import { useEffect, useRef, useState } from "react";

const Chat = () => {
    const webSocketRef = useRef<WebSocket | null>(null);
    const [usersOnline, setUresOnline] = useState([]); 
    
    useEffect(()=>{
        webSocketRef.current = new WebSocket("ws://localhost:1337");

        webSocketRef.current.onopen = ()=>{
            console.log('соеденение установлено!');
            const id = getUserAttribute("id");
            webSocketRef.current?.send(JSON.stringify({type: "init", id}));
            webSocketRef.current?.send(JSON.stringify({type: "checkStatus", id}))
        }

        webSocketRef.current.onmessage = (msg)=>{
            const data = JSON.parse(msg.data);
            console.log('тест: ', data);
            setUresOnline(data.data);
        }

        return ()=>{
            webSocketRef.current?.close();
        };
    },[]);

    return <PagesContainer>
        <Wrapper>
            <h1>Chat</h1>
            <div>
                <h2>Список пользователей онлайн:</h2>
                <ul>
                   
                </ul>
            </div>
        </Wrapper>
    </PagesContainer>
}
 
export default Chat;