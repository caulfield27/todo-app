"use client"
import { ReactNode } from "react";
import styles from './wrapper.module.css'
import '../../app/globals.css'

const Wrapper = ({children} : {children: ReactNode}) => {
    return (
        <div id="wrapper" className={styles.wrapper}>
            {children}
        </div> 

    );
}
 
export default Wrapper;