import { IChat, IDetailedMessage, IMessage } from "@/e_shared/types/types";
import { Dispatch, SetStateAction } from "react";

export function handlePressEnter(
    event: React.KeyboardEvent<HTMLTextAreaElement>,
    readyToSend: boolean,
    ws: WebSocket | null,
    message: IDetailedMessage,
    setMessage: Dispatch<SetStateAction<IDetailedMessage>>,
    chat: IChat,
    setChat: (newChat: IChat)=> void,
){
    if(event.key === "Enter" && readyToSend && !event.shiftKey){
      event.preventDefault();
      addMessageToChat(chat, setChat, message);
      handleSendMessage(ws, message);
      setMessage(prev=> ({...prev, message: ""}))
    }
}

export function handleSendMsg(
    chat: IChat, 
    setChat: (newChat: IChat)=> void, 
    msg: IDetailedMessage, 
    setMessage: Dispatch<SetStateAction<IDetailedMessage>>,
    ws: WebSocket | null,){
        addMessageToChat(chat, setChat,msg);
        handleSendMessage(ws, msg);
        setMessage(prev=> ({...prev, message: ""}));
    }

export function handleMessageChange(
    event: React.ChangeEvent<HTMLTextAreaElement>,
    setReadyToSend: Dispatch<SetStateAction<boolean>>,
    setMessage: Dispatch<SetStateAction<IDetailedMessage>>
)
    {
    if (event.target.value.trim()) {
      setReadyToSend(true);
    } else {
      setReadyToSend(false);
    }
    setMessage(prev=> ({...prev, message: event.target.value}));
};

export function addMessageToChat(
    chat: IChat,
    setChat: (newChat: IChat)=> void, 
    message: IDetailedMessage,
){
    const {messages} = chat;
    if(messages.length){
        let id = messages[messages.length-1].id;
        message["id"] = id ? id+1 : Date.now(); 
    }else{
        message["id"] = 1;
    };
    const updatedMessage = {...message, from: message.from.id}
    messages.push(updatedMessage);
    const updatedChat = {...chat, messages};
    setChat(updatedChat);
}

export function handleSendMessage(
    ws: WebSocket | null,
    message: IDetailedMessage,
){
    console.log('case 1: ', ws?.OPEN);
    
    if(ws && ws.OPEN){
        ws.send(JSON.stringify({type: "message", data: message}));
    }
}