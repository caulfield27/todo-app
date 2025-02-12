import PagesContainer from "@/layouts/pagesContainer/pagesContainer";
import Wrapper from "@/layouts/wrappepr/wrapper";
import { Metadata } from "next";

export const metadata: Metadata ={
  title: "Todo-app | Предстоящие",
  description: "Планируй свои задачи наперед!"
}


const Upcoming = () => {

  return (
    <PagesContainer>
      <Wrapper>
        <h1>Upcoming</h1>
      </Wrapper>
    </PagesContainer>
  );
};

export default Upcoming;
