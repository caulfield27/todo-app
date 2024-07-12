"use client"
import { ReactNode } from "react";
import styles from './pagesContainer.module.css'
import '../../app/globals.css'
import { Sidebar } from "@/b_widgets/Sidebar";
import { useSidebarStore } from "@/store/sidebar/sidebar";
const PagesContainer = ({ children }: { children: ReactNode }) => {
    const showSidebar = useSidebarStore((state)=> state.showSidebar)
    return (
        <>
            <Sidebar/>
            <div className={showSidebar ? styles.hiden_sidebar_container : styles.pages_container}>
                {children}
            </div>
        </>

    );
}

export default PagesContainer;