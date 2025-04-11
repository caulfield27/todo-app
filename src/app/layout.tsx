"use client";

import "./globals.css";
import { ReactNode, useEffect, useLayoutEffect } from "react";
import { useGlobalStore } from "@/store/global/global";
import { usePathname } from "next/navigation";
import { useSidebarStore } from "@/store/sidebar/sidebar";
import { handleThemeChange } from "@/utils/handleThemeChange";
import { BASE_URL } from "@/e_shared/get-env";
import { apiUrl } from "@/routes";
import { getUserAttribute } from "@/utils/getUser";

interface Props {
  children: ReactNode;
}

export default function RootLayout({ children }: Props) {
  const pathname = usePathname();
  const { setSidebar, showSidebar } = useSidebarStore();
  const { isMobile, theme, setTheme } = useGlobalStore();

  useLayoutEffect(() => {
    if (isMobile && showSidebar) {
      setSidebar(false);
    }
  }, [pathname]);

  useLayoutEffect(() => {
    setTheme(localStorage.getItem("theme") || "light");
  }, []);

  useEffect(() => {
    handleThemeChange(theme);
  }, [theme]);

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
