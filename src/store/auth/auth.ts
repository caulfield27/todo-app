import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface IState{
    background: string,
    text: string,
    modal: boolean
}

interface Actions{
    setBackground: (payload: string)=> void,
    setText: (payload: string)=> void,
    setModal: (payload: boolean)=> void
}

export const useAuthModal = create<IState & Actions>(((set)=> ({
    background:'',
    text: '',
    modal: false,
    setBackground: (payload)=> set({background:payload}),
    setText: (payload)=> set({text: payload}),
    setModal: (payload)=> set({modal: payload})                                      
})))