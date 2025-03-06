import { NextRequest, NextResponse } from "next/server";
import { stopCron } from "../../../../../server";


export async function POST(request: NextRequest){
    const {email, token} = await request.json();
    try{
        stopCron(email, token);
        return NextResponse.json({message: "Cron успешно остановлен"}, {status: 200})
    }catch(e){
        console.log(e);
        return NextResponse.json({error: e}, {status: 500})
        
    }
}