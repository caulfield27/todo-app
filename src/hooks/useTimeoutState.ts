"use client"

import { useState } from "react"

export const useTimeoutState = <T>(value: T): [
    T,
    (val: T | ((prev: T)=> T))=> void
] => {
    const [state, setState] = useState(value);

    const handleSetWithTimeout = (arg: T | ((prev: T)=> T))=>{
        setTimeout(()=>{
            if(arg instanceof Function){
                setState(arg(state))
            }else{
                setState(arg);
            }
        },0)
    }

    return [state, handleSetWithTimeout];
}