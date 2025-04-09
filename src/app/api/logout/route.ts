import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { stopCron } from "../../../../server";


export async function POST(request: NextRequest){
    const {email} = await request.json();
    const cookiesStore = cookies();
    let token;
    if(cookiesStore.has("authToken")){
        token = cookiesStore.get("authToken")?.value;
        cookiesStore.delete("authToken");
    };
    stopCron(email, token);
    return NextResponse.json({message: "Успешный выход"}, {status: 200});
}