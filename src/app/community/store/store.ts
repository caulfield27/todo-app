import { IChat, IDetailedMessage, IMessage, IUserData } from "@/e_shared/types/types";
import { create } from "zustand";

interface IState {
  currentChat: IChat | null;
  chats: IChat[];
  users: IUserData[];
  currentComponent: string;
}

interface Actions {
  setCurrentChat: (payload: IChat | null) => void;
  setChats: (chats: IChat[]) => void;
  setUsers: (users: IUserData[]) => void;
  addMessage: (newMsg: IDetailedMessage) => void;
  setCurrentComponent: (payload: string) => void;
}

export const useCommunityStore = create<IState & Actions>((set) => ({
  currentChat: null,
  chats: [],
  users: [],
  currentComponent: "users",
  setCurrentComponent: (payload) => set({ currentComponent: payload }),
  setUsers: (payload) => set({ users: payload }),
  addMessage: (msg) =>
    set((state) => {
      const updatedMsg: IMessage = { ...msg, from: msg.from.id, createdTime: new Date() };
      if (state.currentChat && state.currentChat.userId === msg.from.id) {
        const updatedChat = {
          ...state.currentChat,
          messages: [...state.currentChat.messages, updatedMsg],
        };
        const updatedChats = state.chats.map((chat) =>
          chat.userId === msg.from.id ? updatedChat : chat
        );
        return {
          currentChat: updatedChat,
          chats: updatedChats,
        };
      } else {
        const foundChat = state.chats.find((chat) => chat.userId === msg.from.id);
        if (foundChat) {
          const updatedChat = { ...foundChat, messages: [...foundChat.messages, updatedMsg] };
          const updatedChats = state.chats.map((chat) =>
            chat.userId === msg.from.id ? updatedChat : chat
          );
          return {
            currentChat: updatedChat,
            chats: updatedChats,
          };
        } else {
          const newChat: IChat = {
            username: msg?.from?.username ?? "",
            avatar: msg?.from?.avatar ?? null,
            userId: msg?.from?.id ?? 0,
            messages: [],
          };
          newChat.messages.push(updatedMsg);
          return {
            currentChat: newChat,
            chats: [...state.chats, newChat],
          };
        }
      }
    }),
  setChats: (chats) => set({ chats: chats }),
  setCurrentChat: (payload) => set({ currentChat: payload }),
}));
