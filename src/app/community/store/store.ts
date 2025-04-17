import { ReactElement } from "react";
import { create } from "zustand";

interface IState{
    currentComponent: string
}

interface Actions{
    setCurrentComponent: (payload: string)=> void
}

export const useCommunityStore = create<IState & Actions>((set)=> ({
    currentComponent: "users",
    setCurrentComponent: (payload)=> set({currentComponent: payload}) 
}))