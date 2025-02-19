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

  useEffect(() => {
    getToken().then((token) => {
      const userEmail = getUserAttribute("email");
      if (token && userEmail) {
        setToken(token);
        setEmail(userEmail);
      }
    });
  }, []);

  function handleStart() {
    if (token && email) {
      const interval = setInterval(()=>{
        axios.post("/api/checkTodoes", {email, token})
        .then((res)=>{
          console.log(res);
        }).catch((e)=>{
          console.log(e);
        })
      },60000)
      localStorage.setItem("cron",JSON.stringify(interval));
    }
  }

  function handleStop() {
    const cron = localStorage.getItem("cron");
    if(cron){
      clearInterval(JSON.parse(cron));
    }
  }

  return (
    <header className={styles.header_grid}>
      <div>
        <button onClick={handleStart}>Запустить cron задачу</button>
        <button onClick={handleStop}>Остановить крон задачу</button>
      </div>
      <span className={styles.my_day_span}>Мой день</span>
      <span className={styles.date_span}>{parseDateToReadable(currentDay.toString(), false)}</span>
    </header>
  );
};

export default MyDayHeader;
