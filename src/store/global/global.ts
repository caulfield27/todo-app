import {create} from "zustand"

export interface ISnackBar{
    isActive: boolean,
    message: string,
    type: "success" | "error"
}

interface IStates{
    sidebarWidth: number,
    isTablet: boolean,
    isMobile: boolean,
    snackBar: ISnackBar,
    theme: string | null
}

type Actions = {
    setSidebarWidth: (width: number)=> void,
    setIsMobile: (payload: boolean)=> void,
    setIsTablet: (payload: boolean)=> void,
    setSnackBar: (payload: ISnackBar)=> void,
    setTheme: (theme: string)=> void
}

export const useGlobalStore = create<IStates & Actions>((set)=>({
    sidebarWidth: 0,
    isMobile: false,
    isTablet: false,
    snackBar: {
        isActive: false,
        message: "",
        type: "success"
    },
    theme: null,
    setTheme: (theme)=> set({theme: theme}),
    setSnackBar: (payload: ISnackBar)=> set({snackBar: payload}),
    setIsTablet: (payload: boolean) => set({isTablet: payload}),
    setIsMobile: (payload: boolean)=> set({isMobile: payload}),
    setSidebarWidth: (width: number) => set({sidebarWidth: width}),
}))