"use client"
import styles from './ProfileDropdown.module.css'
import LogoutIcon from '@mui/icons-material/Logout';
import { useRouter } from 'next/navigation';

interface Props{
  active: boolean,
  handleClick: ()=> void
}

export default function ProfileDropdown({ active, handleClick }: Props) {
  
  const router = useRouter()

  return (
    <div className={active ? styles.active_dropdown : styles.dropdown_container}>
      <header className={styles.dropdown_header}>

      </header>
      <div className={styles.dropdown_footer}>
        <button className={styles.logout_btn} onClick={()=> handleClick()}>
          <LogoutIcon />
          <span>Logout</span>
        </button>
      </div>

    </div>
  )
}
