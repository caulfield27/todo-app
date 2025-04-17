"use client";

import "./globals.css";
import { ReactNode, useEffect, useLayoutEffect } from "react";
import { useGlobalStore } from "@/store/global/global";
import { usePathname } from "next/navigation";
import { useSidebarStore } from "@/store/sidebar/sidebar";
import { handleThemeChange } from "@/utils/handleThemeChange";
import { getUserAttribute } from "@/utils/getUser";
import { PoppinsText } from "@/fonts";
import { WebSocketProvider } from "@/c_feauters/WebSocket/WebSocketProvider";

interface Props {
  children: ReactNode;
}

export default function RootLayout({ children }: Props) {
  const pathname = usePathname();
  const { setSidebar, showSidebar } = useSidebarStore();
  const { isMobile, theme, setTheme, setAvatar } = useGlobalStore();

  useLayoutEffect(() => {
    if (isMobile && showSidebar) {
      setSidebar(false);
    }
  }, [pathname]);

  useLayoutEffect(() => {
    setTheme(localStorage.getItem("theme") || "light");
    setAvatar(getUserAttribute("avatar") || null);
  }, []);

  useEffect(() => {
    handleThemeChange(theme);
  }, [theme]);

  return (
    <>
      <html className={PoppinsText.variable} lang="en">
        <body>
          <div className="app_container">
            {pathname.startsWith("/auth") ? (
              children
            ) : (
              <WebSocketProvider>{children}</WebSocketProvider>
            )}
          </div>
        </body>
      </html>
    </>
  );
}
