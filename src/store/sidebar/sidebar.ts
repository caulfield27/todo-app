import { create } from "zustand";


export interface ISidebarStates{
    showSidebar:boolean,
    setSidebar:(payload: boolean)=> void
}

export const useSidebarStore = create<ISidebarStates>((set)=>({
    showSidebar: true,
    setSidebar: (payload: boolean)=> set((state)=> ({showSidebar: payload})) 
}))