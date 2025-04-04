"use client";
import PagesContainer from "@/layouts/pagesContainer/pagesContainer";
import Wrapper from "@/layouts/wrappepr/wrapper";
import styles from "./page.module.css";
import { TaskList } from "@/b_widgets/TaskList";
import { useEffect } from "react";


const Completed = () => {

  useEffect(()=>{
    document.title = "Todo-app | Выполненные";
  })

  return (
    <PagesContainer>
      <Wrapper>
        <h1 className={styles.header_title}>Выполненные</h1>
        <TaskList type="completed"/>
      </Wrapper>
    </PagesContainer>
  );
};

export default Completed;
