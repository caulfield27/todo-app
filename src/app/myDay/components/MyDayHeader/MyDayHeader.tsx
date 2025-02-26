"use client";
import { parseDateToReadable } from "@/utils/getDate";
import styles from "./MyDayHeader.module.css";
import axios from "axios";

const MyDayHeader = () => {
  const currentDay = new Date();

  function handleStart(){
    axios.post('/api/cron/start');
  }

  return (
    <header className={styles.header_grid}>
      <button onClick={handleStart}>Start Cron task</button>
      <span className={styles.my_day_span}>Мой день</span>
      <span className={styles.date_span}>{parseDateToReadable(currentDay.toString(), false)}</span>
    </header>
  );
};

export default MyDayHeader;
