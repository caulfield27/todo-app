import { LoginLeftSection } from "@/b_widgets/LoginLeftSection";
import Wrapper from "@/layouts/wrappepr/wrapper";
import styles from '../auth.module.css'
import { Metadata } from "next";

export const metadata: Metadata ={
    title: "Todo-app | Вход",
    description: "Начни ставить задачи, и следить за своим прогрессом"
  }


const Login = () => {

    return (

        
            <Wrapper>
                <div className={styles.auth_container}>
                    <LoginLeftSection authType="ВОЙТИ" />
                </div>
            </Wrapper>
    );
}

export default Login;