"use client"
import { useLayoutEffect } from "react";
import { useRouter } from "next/navigation";
import { isAuth } from "@/utils/isAuth";

export default function Home() {
  const router = useRouter()
  useLayoutEffect(() => {
    if (isAuth()) {
      router.push('/myDay')
    } else {
      router.push('/auth/login')

    }
  }, [])

  return (
    <></>
  );
}
