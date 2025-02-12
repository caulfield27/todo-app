"use client";
import "./globals.css";
import { ReactNode, useLayoutEffect } from "react";

interface Props {
  children: ReactNode;
}

export default function RootLayout({ children }: Props) {
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
