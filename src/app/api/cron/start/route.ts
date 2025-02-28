import { NextRequest, NextResponse } from "next/server";
import {startCron} from "../../../../../server"


export async function POST(request: NextRequest){
    try{
        const {email, userId, token} = await request.json();
        startCron(email, userId, token);
        return NextResponse.json({message: "Cron успешно запущен"}, {status: 200})
    }catch(e){
        console.log(e);
        return NextResponse.json({error: e}, {status: 500})
        
    }
}