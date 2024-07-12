import styles from './authButton.module.css'

interface Props{
    label:string,
    handleClick: ()=>void
}

const AuthButton = ({label, handleClick} : Props) => {
    return (
        <button className={styles.auth_btn} onClick={handleClick}>{label}</button>
    );
}
 
export default AuthButton;