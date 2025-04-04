"use client";

import PagesContainer from "@/layouts/pagesContainer/pagesContainer";
import Wrapper from "@/layouts/wrappepr/wrapper";
import MyDayHeader from "./components/MyDayHeader/MyDayHeader";
import { TaskList } from "@/b_widgets/TaskList";
import { useEffect } from "react";

const Page = () => {

  useEffect(()=>{
    document.title = "Todo-app | Мой день";
  })

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
