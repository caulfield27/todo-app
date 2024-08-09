"use client"
import { isAuth } from "@/utils/isAuth";
import { ReactNode, useEffect, useLayoutEffect } from "react";
import { useRouter } from "next/navigation";
import { getFromStorage } from "@/utils/useLocaleStorage";
import useSWR from "swr";
import { getTodoes } from "@/utils/api";
import { useTaskStore } from "@/store/addTask/addTask";

const BrowserPrivateRoute = ({children} : {children: ReactNode}) => {
    const router = useRouter()
    // 0
    
    useLayoutEffect(()=>{
        if(!isAuth()){
            router.push('/auth/login')
        }
    },[])

    return ( isAuth() ? children : null);
}
 
export default BrowserPrivateRoute;