import { ReactNode } from "react";
import styles from './wrapper.module.css'
import '../../app/globals.css'

const Wrapper = ({children} : {children: ReactNode}) => {
    return (
        <div className={styles.wrapper}>
            {children}
        </div> 

    );
}
 
export default Wrapper;