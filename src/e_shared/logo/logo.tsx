import styles from './logo.module.css'

const Logo = () => {
    return ( 
        <header className={styles.logo_wrap}>
            <img className={styles.logo_img} src="/logo.png" alt="logo"/>
            <h1>DailyDo</h1>
        </header>
     );
}
 
export default Logo;