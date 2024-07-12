import styles from './logo.module.css'

const Logo = () => {
    return ( 
        <header className={styles.logo_wrap}>
            <img className={styles.logo_img} src="/logo.png" alt="logo"/>
            <h2>MyToDo</h2>
        </header>
     );
}
 
export default Logo;