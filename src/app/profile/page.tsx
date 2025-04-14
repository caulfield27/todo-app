"use client";

import PagesContainer from "@/layouts/pagesContainer/pagesContainer";
import Wrapper from "@/layouts/wrappepr/wrapper";
import { getUserAttribute } from "@/utils/getUser";
import { useEffect } from "react";
import styles from "./page.module.css";
import UpdateProfileForm from "./UpdateProfileForm/UpdateProfileForm";

const Profile = () => {
  useEffect(() => {
    document.title = `DailyDo | Профиль`;
  }, []);

  return (
    <PagesContainer>
      <Wrapper>
        <div>
          <h1 className={styles.profile_header}>{`Мой профиль`}</h1>
          <UpdateProfileForm />
        </div>
      </Wrapper>
    </PagesContainer>
  );
};

export default Profile;
