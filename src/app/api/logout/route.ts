import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    const cookieStorage = cookies();
    cookieStorage.delete("authToken");
    return NextResponse.json({message: 'успешно'}, {status: 200});
}