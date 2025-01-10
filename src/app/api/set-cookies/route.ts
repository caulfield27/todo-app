import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const { jwt } = await request.json();

  const cookiesStorage = cookies();
  cookiesStorage.set("authToken", jwt, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    sameSite: "strict",
  });

  return NextResponse.json({message: "Авторизация прошла успешно"},{status: 200});
}
