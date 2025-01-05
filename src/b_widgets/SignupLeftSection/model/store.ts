import React from "react";
import { create } from "zustand";

interface IStates{
    currentComponent: React.ReactElement | null;
}

type Actions = {
    setCurrentComponent: (payload: React.ReactElement) => void,
}

export const useSignupStore = create<Actions & IStates>((set)=>({
    currentComponent: null,
    setCurrentComponent: (payload)=> set({currentComponent: payload})  
}))