"use client";
import PagesContainer from "@/layouts/pagesContainer/pagesContainer";
import Wrapper from "@/layouts/wrappepr/wrapper";
import styles from "./page.module.css";
import { TaskList } from "@/b_widgets/TaskList";
import { useEffect } from "react";



const Important = () => {
  
  useEffect(()=>{
    document.title = "DailyDo | Важные";
  })
  
  return (
    <PagesContainer>
      <Wrapper>
        <h1 className={styles.header_title}>Важные</h1>
        <TaskList type="important" />
      </Wrapper>
    </PagesContainer>
  );
};

export default Important;
