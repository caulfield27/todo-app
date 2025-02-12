import {create} from "zustand"

interface IStates{
    sidebarWidth: number,
    isMobile: boolean
}

type Actions = {
    setSidebarWidth: (width: number)=> void,
    setIsMobile: (payload: boolean)=> void
}

export const useGlobalStore = create<IStates & Actions>((set)=>({
    sidebarWidth: 280,
    isMobile: false,
    setIsMobile: (payload: boolean)=> set(()=> ({isMobile: payload})),
    setSidebarWidth: (width: number) => set(()=> ({sidebarWidth: width})),
}))