import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const { jwt } = await request.json();

  const cookiesStorage = cookies();
  const expire = new Date();
  expire.setFullYear(expire.getFullYear() + 10);
  cookiesStorage.set("authToken", jwt, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    sameSite: "strict",
    expires: expire,
  });

  return NextResponse.json(
    {
      message: "Авторизация прошла успешно",
    },
    {
      status: 200,
    }
  );
}
