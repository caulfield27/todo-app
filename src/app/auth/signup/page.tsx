"use client"
import { SignupLeftSection } from '@/b_widgets/SignupLeftSection';
import styles from '../auth.module.css'
import Wrapper from '@/layouts/wrappepr/wrapper';
import { BrowserGuestRoute } from '@/routes/BrowserGuestRoute';

const Signup = () => {
    return (
        <BrowserGuestRoute>
            <Wrapper>
                <div className={styles.auth_container}>
                    <SignupLeftSection authType='РЕГИСТРАЦИЯ' />
                </div>
            </Wrapper>
        </BrowserGuestRoute>

    );
}

export default Signup;