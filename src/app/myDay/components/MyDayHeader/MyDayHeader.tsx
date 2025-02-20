"use client";
import { parseDateToReadable } from "@/utils/getDate";
import styles from "./MyDayHeader.module.css";
import { useEffect, useState } from "react";
import { getToken } from "@/utils/getToken";
import { getUserAttribute } from "@/utils/getUser";
import axios from "axios";

const MyDayHeader = () => {
  const currentDay = new Date();
  const [token, setToken] = useState("");
  const [email, setEmail] = useState("");
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    getToken().then((token) => {
      const userEmail = getUserAttribute("email");
      const userId = getUserAttribute("id");
      if (token && userEmail && userId) {
        setToken(token);
        setEmail(userEmail);
        setUserId(userId);
      }
    });
  }, []);

  function handleStart() {
    if (token && email && userId) {
      axios
        .post("/api/checkTodoes", { email, token, userId })
        .then((res) => {
          console.log(res);
        })
        .catch((e) => {
          console.log(e);
        });
    }
  }

  return (
    <header className={styles.header_grid}>
      <div>
        <button onClick={handleStart}>Запустить cron задачу</button>
      </div>
      <span className={styles.my_day_span}>Мой день</span>
      <span className={styles.date_span}>{parseDateToReadable(currentDay.toString(), false)}</span>
    </header>
  );
};

export default MyDayHeader;
