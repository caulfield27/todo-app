import PagesContainer from "@/layouts/pagesContainer/pagesContainer";
import Wrapper from "@/layouts/wrappepr/wrapper";
import MyDayHeader from "./components/MyDayHeader/MyDayHeader";
import TaskList from "./components/TaskList/TaskList";
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
          <TaskList />
        </Wrapper>
      </PagesContainer>
    </>
  );
};

export default Page;
