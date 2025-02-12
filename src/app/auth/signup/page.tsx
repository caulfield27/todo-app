import { SignupLeftSection } from "@/b_widgets/SignupLeftSection";
import styles from "../auth.module.css";
import Wrapper from "@/layouts/wrappepr/wrapper";
import { Metadata } from "next";

export const metadata: Metadata ={
    title: "Todo-app | Регистрация",
    description: "С нами, ты станешь намного производительнее и сможешь держать в контроле все свои дела!"
  }


const Signup = () => {
  return (
    <Wrapper>
      <div className={styles.auth_container}>
        <SignupLeftSection authType="РЕГИСТРАЦИЯ" />
      </div>
    </Wrapper>
  );
};

export default Signup;
