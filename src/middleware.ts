import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { cookies } from "next/headers";

export default function middleware(request: NextRequest) {
  const cookieStore: any = cookies();
  const isLogin = cookieStore.has("refreshToken");
  // if (!isLogin) {
  //   return NextResponse.redirect(new URL("/", request.url));
  // }

  console.log(request.nextUrl.pathname + " " + isLogin);
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/order/:path*",
    "/products/:path*",
    "/purchaseorder/:path*",
    "/purchasinghistory/:path*",
    "/neraca/:path*",
  ],
};
