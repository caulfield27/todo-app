"use client";
import AddTaskButton from "@/e_shared/addTaskButton/AddTaskButton";
import styles from "./Sidebar.module.css";
import { sidebarLinks } from "../model/sidebarLinks";
import Link from "next/link";
import "../../../app/globals.css";
import { usePathname } from "next/navigation";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useSidebarStore } from "@/store/sidebar/sidebar";
import { ProfileDropdown } from "@/c_feauters/profileDropdown";
import { IUserData } from "@/e_shared/types/types";
import AddTaskModal from "@/modals/addTaskModal/AddTaskModal";
import { useGlobalStore } from "@/store/global/global";
import Popover from "@/e_shared/popover/Popover";
import InfoModal from "@/modals/infoModal/InfoModal";
import { handleDisableEvents } from "@/utils/handleDisableEvents";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { BASE_URL } from "@/e_shared/get-env";
import { Avatar } from "@mui/material";
import { deepOrange } from "@mui/material/colors";
import { handleUsername } from "@/utils/handleUsername";

export default function Sidebar() {
  const { showSidebar, setSidebar } = useSidebarStore();
  const sidebarRef = useRef<HTMLElement | null>(null);
  const { setSidebarWidth, sidebarWidth, isMobile, isTablet } = useGlobalStore();
  const snackBar = useGlobalStore((state) => state.snackBar);
  const setSnackBar = useGlobalStore((state) => state.setSnackBar);
  const [userDropdown, setUserDropdown] = useState(false);
  const currentPage = usePathname();
  const [user, setUser] = useState<IUserData | "">("");
  const [isOpen, setIsOpen] = useState(false);
  const { avatar } = useGlobalStore();

  useLayoutEffect(() => {
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
      setSidebarWidth(isTablet ? sidebarRef.current.offsetWidth : 280);
      sidebarRef.current.style.display = "block";
    }

    if (window.outerWidth <= 425) {
      setSidebar(false);
    }
  }, []);

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
              {userDropdown && (
                <ProfileDropdown onCLose={() => setUserDropdown(false)} active={userDropdown} />
              )}
              <div className={styles.user}>
                {avatar ? (
                  <div
                    style={{ cursor: "pointer" }}
                    role="button"
                    onClick={() => setUserDropdown((prev) => !prev)}
                  >
                    <Avatar
                      alt={"user photo"}
                      src={avatar.startsWith("/uploads") ? BASE_URL + avatar : avatar}
                    />
                  </div>
                ) : (
                  <div
                    role="button"
                    style={{ cursor: "pointer" }}
                    onClick={() => setUserDropdown((prev) => !prev)}
                  >
                    <Avatar sx={{ bgcolor: deepOrange["500"] }}>
                      <span>{typeof user === "object" ? user?.username[0] : "U"}</span>
                    </Avatar>
                  </div>
                )}
                {!isTablet && (
                  <span className={styles.userName}>
                    {typeof user === "object" ? handleUsername(user.username) : "User"}
                  </span>
                )}
              </div>
              {!isTablet && (
                <button className={`${styles.not_btn} ${styles.header_btn}`}>
                  <NotificationsNoneIcon className={styles.notification} />
                </button>
              )}
            </article>
            <button
              style={
                isTablet
                  ? { display: "none" }
                  : !showSidebar
                  ? { left: sidebarWidth - (isMobile ? 20 : 10) }
                  : {}
              }
              className={!showSidebar ? styles.openArrow : styles.closedArrow}
              onClick={() => setSidebar(!showSidebar)}
            >
              {!showSidebar ? (
                <ArrowForwardIosIcon className={styles.arrow} />
              ) : (
                <ArrowBackIosIcon className={styles.arrow} />
              )}
            </button>
          </div>
        </header>
        <div className={styles.sidebar_content}>
          <div onClick={() => setIsOpen((prev) => !prev)} className={styles.add}>
            <AddTaskButton />
          </div>
          <nav className={styles.navigation_container}>
            {sidebarLinks.map((elem) => {
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
                    {elem.icon}
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
