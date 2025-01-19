"use server"

import { cookies } from "next/headers";

export async function getToken(){
    let token = cookies().get('authToken')?.value;
    return token;
}