import { TaskList } from "@/b_widgets/TaskList";
import PagesContainer from "@/layouts/pagesContainer/pagesContainer";
import Wrapper from "@/layouts/wrappepr/wrapper";
import { Metadata } from "next";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Todo-app | Предстоящие",
  description: "Планируй свои задачи наперед!",
};

const Upcoming = () => {
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
