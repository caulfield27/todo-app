"use client";
import AddTaskButton from "@/e_shared/addTaskButton/AddTaskButton";
import styles from "./Sidebar.module.css";
import { sidebarLinks } from "../model/sidebarLinks";
import Link from "next/link";
import "../../../app/globals.css";
import StarsIcon from "@mui/icons-material/Stars";
import TodayIcon from "@mui/icons-material/Today";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import AddTaskIcon from "@mui/icons-material/AddTask";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useSidebarStore } from "@/store/sidebar/sidebar";
import { ProfileDropdown } from "@/c_feauters/profileDropdown";
import axios from "axios";
import { IUserData } from "@/e_shared/types/types";
import AddTaskModal from "@/modals/addTaskModal/AddTaskModal";
import { useGlobalStore } from "@/store/global/global";

const icons = [<TodayIcon />, <CalendarMonthIcon />, <StarsIcon />, <AddTaskIcon />];

export default function Sidebar() {
  const { showSidebar, setSidebar } = useSidebarStore();
  const sidebarRef = useRef<HTMLElement | null>(null);
  const { setSidebarWidth, sidebarWidth, isMobile, setIsMobile, isTablet, setIsTablet } =
    useGlobalStore();
  const [userDropdown, setUserDropdown] = useState(false);
  const currentPage = usePathname();
  const router = useRouter();
  const [user, setUser] = useState<IUserData | "">("");
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const getUserFromStorage = localStorage.getItem("user");
    setUser(
      getUserFromStorage
        ? JSON.parse(getUserFromStorage)
        : {
            email: "bot@gmail.com",
            username: "Bot",
          }
    );
  }, []);

  useEffect(() => {
    if (sidebarRef.current) {
      setSidebarWidth(sidebarRef.current.offsetWidth);
      sidebarRef.current.style.display = "block"
    }

    function handleResize() {
      setIsTablet(window.innerWidth < 768 && window.innerWidth >= 425);
      setIsMobile(window.innerWidth < 425);

      if (window.innerWidth < 425) {
        setSidebar(false);
      } else {
        setSidebar(true);
      }
    }

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [isTablet, isMobile]);

  useEffect(() => {
    const handleClickOutside = (e: any) => {
      if (sidebarRef.current && !sidebarRef.current.contains(e.target)) {
        setSidebar(false);
      }
    };
    if (isMobile && showSidebar) {
      document.body.style.overflow = "hidden";
      document.addEventListener("click", handleClickOutside);
    } else {
      document.body.style.overflowY = "scroll";
    }

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [showSidebar]);

  function handleLogout() {
    axios.post("/api/logout").then((response) => {
      if (response.status === 200) {
        localStorage.removeItem("user");
        router.push("/auth/login");
      }
    });
  }

  return (
    <>
      <AddTaskModal isOpen={isOpen} />
      <aside
        ref={sidebarRef}
        style={!showSidebar ? { marginLeft: -sidebarWidth} : {}}
        className={styles.sidebar_container}
      >
        <header className={styles.sidebar_header}>
          <div className={styles.user_wrapper}>
            <article
              style={{ display: "flex", alignItems: "center", gap: "12px", position: "relative" }}
            >
              <ProfileDropdown active={userDropdown} handleClick={handleLogout} />
              <div className={styles.user}>
                <button
                  className={styles.user_btn}
                  onClick={() => setUserDropdown((prev) => !prev)}
                >
                  <span>{typeof user === "object" ? user?.username[0] : "U"}</span>
                </button>
                {!isTablet && (
                  <span className={styles.userName}>
                    {typeof user === "object" ? user.username : "User"}
                  </span>
                )}
              </div>
              {!isTablet && (
                <button className={`${styles.not_btn} ${styles.header_btn}`}>
                  <img src="/notification.png" alt="notification" />
                </button>
              )}
            </article>
            <button
              style={
                isTablet
                  ? { display: "none" }
                  : !showSidebar
                  ? { left: sidebarWidth - 15}
                  : {}
              }
              className={
                !showSidebar
                  ? `${styles.openArrow} ${styles.header_btn}`
                  : `${styles.closedArrow} ${styles.header_btn}`
              }
              onClick={() => setSidebar(!showSidebar)}
            >
              <img src={!showSidebar ? "/sidebarClosed.svg" : "/sidebarOpen.svg"} alt="hide icon" />
            </button>
          </div>
        </header>
        <div className={styles.sidebar_content}>
          <div onClick={() => setIsOpen((prev) => !prev)} className={styles.add}>
            <AddTaskButton />
          </div>
          <nav className={styles.navigation_container}>
            {sidebarLinks.map((elem, ind) => {
              const isActive = elem.path === currentPage;
              return (
                <Link
                  key={elem.id}
                  href={elem.path}
                  className={
                    isActive ? `${styles.link_item} ${styles.active_link}` : styles.link_item
                  }
                >
                  <div className={styles.link_text}>
                    {icons[ind]}
                    {!isTablet && elem.label}
                  </div>
                </Link>
              );
            })}
          </nav>
        </div>
      </aside>
    </>
  );
}
