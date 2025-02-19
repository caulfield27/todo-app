import PagesContainer from "@/layouts/pagesContainer/pagesContainer";
import Wrapper from "@/layouts/wrappepr/wrapper";
import MyDayHeader from "./components/MyDayHeader/MyDayHeader";
import { TaskList } from "@/b_widgets/TaskList";
import { Metadata } from "next";

export const metadata: Metadata ={
  title: "Todo-app | Мой день",
  description: "Контролируй свой день отслеживая задачи каждый день."
}


const Page = () => {
  return (
    <>
      <PagesContainer>
        <Wrapper>
          <MyDayHeader />
          <TaskList type="today"/>
        </Wrapper>
      </PagesContainer>
    </>
  );
};

export default Page;
