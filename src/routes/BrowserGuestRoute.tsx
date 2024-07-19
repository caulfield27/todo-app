"use clinet"

import { isAuth } from "@/utils/isAuth"
import { ReactNode, useLayoutEffect } from "react"
import { useRouter } from "next/navigation"

export const BrowserGuestRoute = ({children}:{children: ReactNode})=>{
    const router = useRouter()
    useLayoutEffect(()=>{
        if(isAuth()){
            router.push('/myDay')
        }
    },[])

    return (!isAuth() ? children : null)

}