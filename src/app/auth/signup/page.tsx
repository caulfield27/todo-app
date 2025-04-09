"use client";

import { SignupLeftSection } from "@/b_widgets/SignupLeftSection";
import styles from "../auth.module.css";
import Wrapper from "@/layouts/wrappepr/wrapper";
import { useEffect } from "react";


const Signup = () => {
  useEffect(()=>{
    document.title = "DailyDo | Регистрация"
  },[])
  
  return (
    <Wrapper>
      <div className={styles.auth_container}>
        <SignupLeftSection authType="РЕГИСТРАЦИЯ" />
      </div>
    </Wrapper>
  );
};

export default Signup;
