"use client"
import Logo from "@/e_shared/logo/logo";
import styles from './AuthLeftSection.module.css'
import { LoginForm } from "@/c_feauters/loginForm";

export default function LoginLeftSection({authType} : {authType:string}) {
  return (
    <section>
      <div className={styles.left_section_container}>
        <Logo />
        <article className={styles.auth_content}>
          <h1>{authType}</h1>
          <div className={styles.auth_form}>
            <LoginForm/>
          </div>
        </article>
      </div>
    </section>
  )
}
