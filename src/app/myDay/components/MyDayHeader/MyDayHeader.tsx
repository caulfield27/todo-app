"use client";
import { parseDateToReadable } from "@/utils/getDate";
import styles from "./MyDayHeader.module.css";
import axios from "axios";
import { getUserAttribute } from "@/utils/getUser";
import { getToken } from "@/utils/getToken";
import { strapi } from "@/e_shared/api";
import { useEffect, useState } from "react";
import { startCron } from "../../../../../server";

const MyDayHeader = () => {
  const currentDay = new Date();
  const [token, setToken] = useState("");

  useEffect(() => {
    getToken()
      .then((res) => {
        if (res) {
          setToken(res);
        }
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  function handleStart() {
    const email = getUserAttribute("email");
    const userId = getUserAttribute("id");
    if (email && userId && token) {
      axios.post("/api/cron/start", { email, userId, token });
    }
  }

  function stopCron() {
    const email = getUserAttribute("email");
    if(email && token){
      axios.post("/api/cron/stop", {email, token});
    }
    // if (email && token) {
    //   strapi
    //     .get(`cron-tasks?filters[email]=${email}`, {
    //       headers: {
    //         Authorization: `Bearer ${token}`,
    //       },
    //     })
    //     .then((res) => {
    //       console.log(res);
    //     })
    //     .catch((e) => {
    //       console.log(e);
    //     });
    // }
  }

  return (
    <header className={styles.header_grid}>
      <button onClick={handleStart}>Start Cron task</button>
      <button onClick={stopCron}>Stop Cron task</button>
      <span className={styles.my_day_span}>Мой день</span>
      <span className={styles.date_span}>{parseDateToReadable(currentDay.toString(), false)}</span>
    </header>
  );
};

export default MyDayHeader;
