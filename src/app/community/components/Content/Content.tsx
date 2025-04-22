"use client";
import { tabContent, tabList } from "./data";
import styles from "./Content.module.css";
import { Tabs, Tab } from "@mui/material";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useCommunityStore } from "../../store/store";
import { getCommunityData } from "../../api/api";
import CommunityLoader from "../CommunityLoader/CommunityLoader";

export const CommunityContent = () => {
  const searchParams = useSearchParams();
  const [currentComponent, setCurrentComponent] = useState(searchParams.get("type") ?? "users");
  const [loading, setLoading] = useState(false);
  const setChats = useCommunityStore((state) => state.setChats);
  const setUsers = useCommunityStore((state) => state.setUsers);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const type = searchParams.get("type");
    if (type && type !== currentComponent) setCurrentComponent(type);
  }, [searchParams]);

  useEffect(() => {
    getCommunityData(setUsers, setChats, setLoading);
  }, []);

  const handleTabsChange = (event: React.SyntheticEvent, newVal: string) => {
    const params = new URLSearchParams();
    params.set("type", newVal);
    router.replace(`${pathname}?${String(params)}`);
  };

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
          <Tab disabled={loading} key={tab.value} value={tab.value} label={tab.label} />
        ))}
      </Tabs>
      <div>{loading ? <CommunityLoader /> : tabContent[currentComponent]}</div>
    </div>
  );
};
