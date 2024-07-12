"use client"
import { isAuth } from "@/utils/isAuth";
import { ReactNode, useLayoutEffect } from "react";
import { useRouter } from "next/navigation";

const BrowserPrivateRoute = ({children} : {children: ReactNode}) => {
    const router = useRouter()
    useLayoutEffect(()=>{
        if(!isAuth()){
            router.push('/auth/login')
        }
    },[])

    return ( isAuth() ? children : null);
}
 
export default BrowserPrivateRoute;