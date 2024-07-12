import { create } from "zustand";


export interface ISidebarStates{
    showSidebar:boolean,
    setSidebar:()=> void
}

export const useSidebarStore = create<ISidebarStates>((set)=>({
    showSidebar: false,
    setSidebar: ()=> set((state)=> ({showSidebar: !state.showSidebar})) 
}))