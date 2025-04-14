"use client";

import PagesContainer from "@/layouts/pagesContainer/pagesContainer";
import Wrapper from "@/layouts/wrappepr/wrapper";
import { getUserAttribute } from "@/utils/getUser";
import { useEffect } from "react";
import styles from "./page.module.css"

const Profile = () => {

    useEffect(()=> {
        document.title = `DailyDo | Профиль(${getUserAttribute("username")})`
    });

    return <PagesContainer>
        <Wrapper>
            <div>
                <h1 className={styles.profile_header}>{`Мой профиль(${getUserAttribute("username")})`}</h1>
            </div>
        </Wrapper>
    </PagesContainer>
}
 
export default Profile;