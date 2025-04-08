"use client";
import { ReactNode, useEffect } from "react";
import styles from "./pagesContainer.module.css";
import "../../app/globals.css";
import { Sidebar } from "@/b_widgets/Sidebar";
import { useSidebarStore } from "@/store/sidebar/sidebar";
import { useGlobalStore } from "@/store/global/global";

const PagesContainer = ({ children }: { children: ReactNode }) => {
  const showSidebar = useSidebarStore((state) => state.showSidebar);
  const { sidebarWidth, isMobile } = useGlobalStore();
  
  return (
    <>
      <Sidebar />
      <div
        style={showSidebar && !isMobile ? { marginLeft: sidebarWidth } : { marginLeft: 0 }}
        className={styles.pages_container}
      >
        {children}
      </div>
    </>
  );
};

export default PagesContainer;
