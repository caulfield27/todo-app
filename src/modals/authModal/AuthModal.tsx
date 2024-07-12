"use client"
import { useAuthModal } from "@/store/auth/auth";
import styles from './AuthModal.module.css'

const AuthModal = () => {
    const modal = useAuthModal((state)=> state.modal)
    const text = useAuthModal((state)=> state.text)
    const background = useAuthModal((state)=> state.background)

    return (
        <div className={modal ? `${styles.modal_active}` : styles.modal_container} 
        style={{background: background}}>
            <div className={styles.modal_content}>
                <p>{text}</p>
            </div>
        </div> 

    )
}
 
export default AuthModal;