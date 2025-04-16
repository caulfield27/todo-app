"use client";

import PagesContainer from "@/layouts/pagesContainer/pagesContainer";
import Wrapper from "@/layouts/wrappepr/wrapper";
import { Users } from "./components/Users/Users";

const Chat = () => {
    
  return (
    <PagesContainer>
      <Wrapper>
        <h1>Chat</h1>
       <Users/>
      </Wrapper>
    </PagesContainer>
  );
};

export default Chat;
