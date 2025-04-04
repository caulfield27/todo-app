"use client";

import { TaskList } from "@/b_widgets/TaskList";
import PagesContainer from "@/layouts/pagesContainer/pagesContainer";
import Wrapper from "@/layouts/wrappepr/wrapper";
import styles from "./page.module.css";
import { useEffect } from "react";

const Upcoming = () => {

  useEffect(()=>{
    document.title = "Todo-app | Предстоящие";
  })

  return (
    <PagesContainer>
      <Wrapper>
        <h1 className={styles.header_title}>Предстоящие</h1>
        <TaskList type="upcoming" />
      </Wrapper>
    </PagesContainer>
  );
};

export default Upcoming;
