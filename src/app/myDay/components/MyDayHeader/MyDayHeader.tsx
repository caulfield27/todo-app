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

  return (
    <header className={styles.header_grid}>
      <span className={styles.my_day_span}>Мой день</span>
      <span className={styles.date_span}>{parseDateToReadable(currentDay.toString(), false)}</span>
    </header>
  );
};

export default MyDayHeader;
