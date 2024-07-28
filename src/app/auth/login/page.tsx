"use client"
import { LoginLeftSection } from "@/b_widgets/LoginLeftSection";
import Wrapper from "@/layouts/wrappepr/wrapper";
import styles from '../auth.module.css'
import { BrowserGuestRoute } from "@/routes/BrowserGuestRoute";

const Login = () => {

    return (

        <BrowserGuestRoute>
            <Wrapper>
                <div className={styles.auth_container}>
                    <LoginLeftSection authType="ВОЙТИ" />
                </div>
            </Wrapper>
        </BrowserGuestRoute>

    );
}

export default Login;