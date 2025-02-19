// import { NextRequest, NextResponse } from "next/server";
// import {startCron} from "../../../../../server";


// export async function POST(request: NextRequest){
//     const {email, token} = await request.json();
//     try{
//         startCron(email,token);
//         return NextResponse.json({message: "Cron успешно запущен"}, {status: 200})
//     }catch(e){
//         console.log(e);
//         return NextResponse.json({error: e}, {status: 500})
        
//     }
// }