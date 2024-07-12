import { SignupForm } from '@/c_feauters/signupForm'
import styles from '../../LoginLeftSection/ui/AuthLeftSection.module.css'
import Logo from '@/e_shared/logo/logo'

export default function SignupLeftSection({authType} : {authType:string}) {
  return (
    <section>
      <div className={styles.left_section_container}>
        <Logo />
        <article className={styles.auth_content}>
          <h1>{authType}</h1>
          <div className={styles.auth_form}>
            <SignupForm/>
          </div>
        </article>
      </div>
    </section>
  )
}
