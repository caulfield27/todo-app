import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { cookies } from "next/headers";

export async function middleware(request: NextRequest){
    const {pathname} = request.nextUrl;
    const cookieStore = cookies();
    console.log('test');
    
    if(cookieStore.has("authToken") && (pathname.startsWith('/auth') || pathname === "/")){
        return NextResponse.redirect(new URL("/myDay" ,request.url))
    }

    if (!cookieStore.has("authToken") && !pathname.startsWith('/auth')) {
        return NextResponse.redirect(new URL("/auth/login", request.url));
    }


    return NextResponse.next();

}


export const config = {
    matcher: [
        "/", 
        "/auth/:path*", 
        "/completed/:path*",
        "/important/:path*",
        "/myDay/:path*",
        "/upcoming/:path*"
    ]
}
