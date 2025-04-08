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
import { IUserData } from "@/e_shared/types/types";
import AddTaskModal from "@/modals/addTaskModal/AddTaskModal";
import { useGlobalStore } from "@/store/global/global";
import Popover from "@/e_shared/popover/Popover";
import InfoModal from "@/modals/infoModal/InfoModal";
import { handleDisableEvents } from "@/utils/handleDisableEvents";
import { getUserAttribute } from "@/utils/getUser";
import axios from "axios";

const icons = [<TodayIcon />, <CalendarMonthIcon />, <StarsIcon />, <AddTaskIcon />];

export default function Sidebar() {
  const { showSidebar, setSidebar } = useSidebarStore();
  const sidebarRef = useRef<HTMLElement | null>(null);
  const {
    setSidebarWidth,
    sidebarWidth,
    isMobile,
    setIsMobile,
    isTablet,
    setIsTablet,
    snackBar,
    setSnackBar,
  } = useGlobalStore();
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
      setSidebarWidth(280);
      sidebarRef.current.style.display = "block";
    }

    function handleResize() {
      setIsTablet(window.outerWidth < 768 && window.outerWidth >= 425);
      setIsMobile(window.outerWidth < 425);

      if (window.outerWidth < 425) {
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
    if (isMobile) {
      const handleClickOutside = (e: MouseEvent) => {
        e.stopPropagation();
        if (sidebarRef.current && !sidebarRef.current.contains(e.target as Node)) {
          setSidebar(false);
        }
      };
      if (showSidebar) {
        document.body.style.overflow = "hidden";
        document.addEventListener("click", handleClickOutside);
        handleDisableEvents(true);
      } else {
        handleDisableEvents(false);
        document.body.style.overflowY = "scroll";
      }

      return () => {
        document.removeEventListener("click", handleClickOutside);
      };
    }
  }, [showSidebar]);

  const logout = ()=>{
    const email = getUserAttribute("email");
    localStorage.removeItem("user");
    axios.post("/api/logout", {email}).then(()=>{
      window.location.reload();
    });
  }

  return (
    <>
      {snackBar.isActive && <InfoModal modalState={snackBar} setModalState={setSnackBar} />}
      {isOpen && <AddTaskModal isOpen={isOpen} setOpen={setIsOpen} />}
      <aside
        ref={sidebarRef}
        style={
          !showSidebar
            ? { marginLeft: -sidebarWidth }
            : isTablet
            ? { width: "max-content" }
            : { width: "280px" }
        }
        className={styles.sidebar_container}
      >
        <header className={styles.sidebar_header}>
          <div className={styles.user_wrapper}>
            <article
              style={{ display: "flex", alignItems: "center", gap: "12px", position: "relative" }}
            >
              <ProfileDropdown active={userDropdown} handleClick={logout} />
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
                  ? { left: sidebarWidth - (isMobile ? 25 : 10) }
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
                  prefetch={true}
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
                  {isTablet && (
                    <Popover
                      arrow="left"
                      classes={styles["popover_position"]}
                      content={elem.label}
                    />
                  )}
                </Link>
              );
            })}
          </nav>
        </div>
      </aside>
    </>
  );
}
