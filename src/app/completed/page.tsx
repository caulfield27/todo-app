import PagesContainer from "@/layouts/pagesContainer/pagesContainer";
import Wrapper from "@/layouts/wrappepr/wrapper";
import { Metadata } from "next";
import styles from "./page.module.css";
import { TaskList } from "@/b_widgets/TaskList";

export const metadata: Metadata = {
  title: "Todo-app | Выполненные",
  description: "Следи за своим прогрессом по выполнению задач",
};

const Completed = () => {
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
