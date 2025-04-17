"use client";
import { useCommunityStore } from "../../store/store";
import { tabContent, tabList } from "./data";
import styles from "./Content.module.css";
import { Tabs, Tab } from "@mui/material";
import { useGlobalStore } from "@/store/global/global";

export const CommunityContent = () => {
  const { currentComponent, setCurrentComponent } = useCommunityStore();
  
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
          <Tab key={tab.value} value={tab.value} label={tab.label} />
        ))}
      </Tabs>
      <div>{tabContent[currentComponent]}</div>
    </div>
  );
};
