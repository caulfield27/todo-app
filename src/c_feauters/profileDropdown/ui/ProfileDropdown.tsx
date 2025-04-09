"use client";
import styles from "./ProfileDropdown.module.css";
import LogoutIcon from "@mui/icons-material/Logout";
import { useRouter } from "next/navigation";

interface Props {
  active: boolean;
  handleClick: () => void;
  loading: boolean;
}

export default function ProfileDropdown({ active, handleClick, loading }: Props) {
  const router = useRouter();

  return (
    <div className={active ? styles.active_dropdown : styles.dropdown_container}>
      <header className={styles.dropdown_header}></header>
      <div className={styles.dropdown_footer}>
        <button className={styles.logout_btn} onClick={() => handleClick()}>
          <LogoutIcon />
          {loading ? (
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
        </button>
      </div>
    </div>
  );
}
