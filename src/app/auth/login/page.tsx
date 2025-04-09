"use client"
import { LoginLeftSection } from "@/b_widgets/LoginLeftSection";
import Wrapper from "@/layouts/wrappepr/wrapper";
import styles from '../auth.module.css'
import { useEffect } from "react";

const Login = () => {

    useEffect(()=>{
        document.title = "DailyDo | Вход";
    },[])

    return (

        
            <Wrapper>
                <div className={styles.auth_container}>
                    <LoginLeftSection authType="ВОЙТИ" />
                </div>
            </Wrapper>
    );
}

export default Login;