"use client";
import { tabContent, tabList } from "./data";
import styles from "./Content.module.css";
import { Tabs, Tab } from "@mui/material";
import { useSearchParams } from "next/navigation";
import { useEffect, useLayoutEffect, useState } from "react";
import { useCommunityStore } from "../../store/store";
import { getCommunityData } from "../../api/api";
import CommunityLoader from "../CommunityLoader/CommunityLoader";

export const CommunityContent = () => {
  const searchParams = useSearchParams();
  const { currentComponent, setCurrentComponent } = useCommunityStore();
  const [loading, setLoading] = useState(false);
  const setUsers = useCommunityStore((state) => state.setUsers);

  useEffect(() => {
    getCommunityData(setUsers, setLoading);
  }, []);

  useLayoutEffect(() => {
    if (searchParams.has("type")) {
      setCurrentComponent(searchParams.get("type") ?? "users");
    }
  }, []);

  return (
    <div className={styles.content_wrapper}>
      <Tabs
        value={currentComponent}
        onChange={(event: React.SyntheticEvent, newVal: string) => setCurrentComponent(newVal)}
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
