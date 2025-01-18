"use client";
import PagesContainer from "@/layouts/pagesContainer/pagesContainer";
import Wrapper from "@/layouts/wrappepr/wrapper";
import MyDayHeader from "./components/MyDayHeader/MyDayHeader";
import TaskList from "./components/TaskList/TaskList";

const Page = () => {
  return (
    <PagesContainer>
      <Wrapper>
        <MyDayHeader/>
        <TaskList/>
      </Wrapper>
    </PagesContainer>
  );
};

export default Page;
