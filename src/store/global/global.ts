import {create} from "zustand"

interface IStates{
    sidebarWidth: number,
    isTablet: boolean,
    isMobile: boolean
}

type Actions = {
    setSidebarWidth: (width: number)=> void,
    setIsMobile: (payload: boolean)=> void,
    setIsTablet: (payload: boolean)=> void
}

export const useGlobalStore = create<IStates & Actions>((set)=>({
    sidebarWidth: 280,
    isMobile: false,
    isTablet: false,
    setIsTablet: (payload: boolean) => set(()=> ({isTablet: payload})),
    setIsMobile: (payload: boolean)=> set(()=> ({isMobile: payload})),
    setSidebarWidth: (width: number) => set(()=> ({sidebarWidth: width})),
}))