"use client";

import { TaskList } from "@/b_widgets/TaskList";
import PagesContainer from "@/layouts/pagesContainer/pagesContainer";
import Wrapper from "@/layouts/wrappepr/wrapper";
import { useEffect } from "react";
import styles from './page.module.css'

const AllTasks = () => {
  useEffect(() => {
    document.title = "DailyDo | Все задачи";
  }, []);
  
  return (
    <PagesContainer>
      <Wrapper>
        <h1 className={styles.header_title}>Все задачи</h1>
        <TaskList type="all" />
      </Wrapper>
    </PagesContainer>
  );
};

export default AllTasks;
