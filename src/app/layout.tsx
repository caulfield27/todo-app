"use client";

import "./globals.css";
import { ReactNode, useEffect, useLayoutEffect } from "react";
import { useGlobalStore } from "@/store/global/global";
import { usePathname } from "next/navigation";
import { useSidebarStore } from "@/store/sidebar/sidebar";

interface Props {
  children: ReactNode;
}

export default function RootLayout({ children }: Props) {
  const pathname = usePathname();
  const {setSidebar, showSidebar} = useSidebarStore();
  const {isMobile} = useGlobalStore();


  useEffect(()=>{
    if(isMobile && showSidebar){
      setSidebar(false);
    }
  }, [pathname])
  return (
    <>
      <html lang="en">
        <body>
          <div className="app_container">{children}</div>
        </body>
      </html>
    </>
  );
}
