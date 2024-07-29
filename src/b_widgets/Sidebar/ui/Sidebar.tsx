"use client"
import AddTaskButton from '@/e_shared/addTaskButton/AddTaskButton'
import styles from './Sidebar.module.css'
import { sidebarLinks } from '../model/sidebarLinks';
import Link from 'next/link';
import '../../../app/globals.css'
import StarsIcon from '@mui/icons-material/Stars';
import TodayIcon from '@mui/icons-material/Today';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import AddTaskIcon from '@mui/icons-material/AddTask';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useSidebarStore } from '@/store/sidebar/sidebar';
import { getFromStorage } from '@/utils/useLocaleStorage';
import { ProfileDropdown } from '@/c_feauters/profileDropdown';
import { useTaskStore } from '@/store/addTask/addTask';


export default function Sidebar() {
  const { showSidebar, setSidebar } = useSidebarStore()
  const [userDropdown, setUserDropdown] = useState(false)
  const icons = [<TodayIcon />, <CalendarMonthIcon />, <StarsIcon />, <AddTaskIcon />]
  const currentPage = usePathname()
  const user = getFromStorage('user')
  const userName = user[0].name
  const router = useRouter()
  const setAddTaskModal = useTaskStore((state)=> state.setAddTaskModal)

  function handleLogout(){
    localStorage.removeItem('user')
    router.push('/auth/login')
  }
  
  return (
    <aside className={showSidebar ? styles.hide_sidebar : styles.sidebar_container}>
      <header className={styles.sidebar_header}>
        <div className={styles.user_wrapper}>
          <article style={{ display: 'flex', alignItems: 'center', gap: '12px',position:'relative'}}>
            <ProfileDropdown active={userDropdown} handleClick={handleLogout}/>
            <div className={styles.user}>
              <button className={styles.user_btn} onClick={()=> setUserDropdown(prev=> !prev)}>
                <span>{userName[0].toUpperCase()}</span>
              </button>
              <span className={styles.userName}>{userName}</span>
            </div>
            <button className={`${styles.not_btn} ${styles.header_btn}`}>
              <img src="/notification.png" alt="notification" />
            </button>
          </article>
          <button className={showSidebar ? `${styles.openArrow} ${styles.header_btn}` : `${styles.closedArrow} ${styles.header_btn}`} 
          onClick={() => setSidebar()}>
            <img src={showSidebar ? '/sidebarClosed.svg' : '/sidebarOpen.svg'} alt="hide icon" />
          </button>
        </div>
      </header>
      <div className={styles.sidebar_content}>
        <div onClick={() => setAddTaskModal(true)} className={styles.add}>
          <AddTaskButton />
        </div>
        <nav className={styles.navigation_container}>
          {sidebarLinks.map((elem, ind) => {
            const isActive = elem.path === currentPage
            return <Link key={elem.id} href={elem.path} className={isActive ? `${styles.link_item} ${styles.active_link}` : styles.link_item}>
              <div className={styles.link_text}>
                {icons[ind]}
                {elem.label}
              </div>
            </Link>
          })}
        </nav>
      </div>
    </aside>
  )

}

