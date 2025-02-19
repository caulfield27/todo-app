import PagesContainer from "@/layouts/pagesContainer/pagesContainer";
import Wrapper from "@/layouts/wrappepr/wrapper";
import { Metadata } from "next";
import styles from "./page.module.css";
import { TaskList } from "@/b_widgets/TaskList";

export const metadata: Metadata = {
  title: "Todo-app | Важные",
  description: "Не пропусти выжные задачи, и повыси свою производительность",
};

const Important = () => {
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
