import { createTransport } from "@/utils/createTransport";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    const {email, token} = await request.json();
    try{
        console.log(email, token);
        return NextResponse.json({message: "успешно"}, {status: 200});
    }catch(e){
        return NextResponse.json({error: e}, {status: 500})
    }

    
}