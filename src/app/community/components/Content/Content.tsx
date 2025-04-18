"use client";
import { tabContent, tabList } from "./data";
import styles from "./Content.module.css";
import { Tabs, Tab } from "@mui/material";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useCommunityStore } from "../../store/store";

export const CommunityContent = () => {
  const searchParams = useSearchParams();
  const [currentComponent, setCurrentComponent] =  useState(searchParams.get("type") ?? "users");
  const {setCurrentChat, chats} = useCommunityStore(); 
  const pathname = usePathname();
  const router = useRouter();

  useEffect(()=>{
    const type = searchParams.get("type");
    const chat = searchParams.get("chat");
    if(type && type !== currentComponent) setCurrentComponent(type);
    if(chat){
      const newChat = chats.find((chat)=> chat.userId === Number(chat));
      if(newChat) setCurrentChat(newChat); 
    };
  }, [searchParams]);

  const handleTabsChange = (event: React.SyntheticEvent, newVal: string)=>{
    const params = new URLSearchParams();
    params.set("type", newVal);
    router.replace(`${pathname}?${String(params)}`);
  }
  
  return (
    <div className={styles.content_wrapper}>
      <Tabs
        value={currentComponent}
        onChange={handleTabsChange}
        textColor="inherit"
        indicatorColor="primary"
        variant="scrollable"
        aria-label="community content tabs"
      >
        {tabList.map((tab) => (
          <Tab key={tab.value} value={tab.value} label={tab.label} />
        ))}
      </Tabs>
      <div>{tabContent[currentComponent]}</div>
    </div>
  );
};
