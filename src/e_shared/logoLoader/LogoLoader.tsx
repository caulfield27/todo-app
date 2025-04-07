"use client";

import Image from "next/image";
import logo from "../../../public/logo.png";
import styles from './LogoLoader.module.css'

export const LogoLoader = () => {
    return <Image className={styles.logo} width={150} height={150} src={logo} alt="app logo"/>
    
}
