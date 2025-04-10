"use client";
import styles from "./ProfileDropdown.module.css";
import LogoutIcon from "@mui/icons-material/Logout";
import { useRouter } from "next/navigation";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import { useEffect, useRef, useState } from "react";
import { useGlobalStore } from "@/store/global/global";
import { getUserAttribute } from "@/utils/getUser";
import axios from "axios";

interface Props {
  active: boolean;
  onCLose: () => void;
}

export default function ProfileDropdown({ active, onCLose }: Props) {
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const setTheme = useGlobalStore((state) => state.setTheme);
  const theme = useGlobalStore((state) => state.theme);
  const [logoutLoading, setLogoutLoading] = useState(false);
  const navigate = useRouter();
  const setSnackBar = useGlobalStore((state) => state.setSnackBar);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        onCLose();
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const logout = (e: React.MouseEvent<HTMLDivElement>) => {
    const email = getUserAttribute("email");
    localStorage.removeItem("user");
    setLogoutLoading(true);
    axios
      .post("/api/logout", { email })
      .then(() => {
        navigate.push("auth/login");
      })
      .catch(() => {
        setSnackBar({
          type: "error",
          isActive: true,
          message: "Не удалось выйти с приложения, попробуйте еще раз.",
        });
        setLogoutLoading(false);
      });
  };

  const handleToggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  return (
    <div ref={dropdownRef} className={active ? styles.active_dropdown : styles.dropdown_container}>
      <div role="button" className={styles.dropdown_item}>
        <AccountCircleIcon style={{ color: "gray" }} />
        <span>Мой профиль</span>
      </div>
      <div onClick={handleToggleTheme} role="button" className={styles.dropdown_item}>
        {theme === "dark" ? <LightModeIcon /> : <DarkModeIcon style={{ color: "#260744" }} />}
        <span>Тема</span>
      </div>
      <div role="button" className={styles.dropdown_item} onClick={logout}>
        <LogoutIcon />
        {logoutLoading ? (
          <>
          <span>Выход</span>
            <div className={styles.dots}>
              <span className={styles.dot_1}></span>
              <span className={styles.dot_2}></span>
              <span className={styles.dot_3}></span>
            </div>
          </>
          
        ) : (
          <span>Выйти</span>
        )}
      </div>
    </div>
  );
}
