"use client"
import SignupForm from './signupForm/SignupForm'
import styles from '../../LoginLeftSection/ui/AuthLeftSection.module.css'
import Logo from '@/e_shared/logo/logo'
import { useSignupStore } from '../model/store';

export default function SignupLeftSection({authType} : {authType:string}) {
  const {currentComponent} = useSignupStore();
  return (
    <section>
      <div className={styles.left_section_container}>
        <Logo />
        <article className={styles.auth_content}>
          <h1>{authType}</h1>
          <div className={styles.auth_form}>
            {currentComponent ?? <SignupForm/>}
          </div>
        </article>
      </div>
    </section>
  )
}
