"use client";

import PagesContainer from "@/layouts/pagesContainer/pagesContainer";
import Wrapper from "@/layouts/wrappepr/wrapper";
import { useEffect } from "react";
import styles from "./page.module.css";
import { CommunityContent } from "./components/Content/Content";

const Community = () => {
  useEffect(() => {
    document.title = "DailyDo | Сообщество";
  }, []);

  return (
    <PagesContainer>
      <Wrapper>
        <h1 className={styles.header_title}>Сообщество</h1>
        <CommunityContent/>
      </Wrapper>
    </PagesContainer>
  );
};

export default Community;
