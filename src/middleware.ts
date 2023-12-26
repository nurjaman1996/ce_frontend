import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { cookies } from "next/headers";
import { jwtDecode } from "jwt-decode";

export default function middleware(request: NextRequest) {
  const cookieStore: any = cookies();
  const isLogin = cookieStore.has("refreshToken");
  const isLoginData = cookieStore.get("refreshToken");
  const dataLogin: any =
    isLoginData.value != "" ? jwtDecode(isLoginData.value) : null;

  if (!isLogin) {
    return NextResponse.redirect(new URL("/", request.url));
  } else {
    const path = request.nextUrl.pathname;
    const role = dataLogin.datarole;
    if (role === "ADMIN_CUSTOMER") {
      if (
        path.startsWith("/warehouse") ||
        path.startsWith("/account") ||
        path.startsWith("/supplier") ||
        path.startsWith("/batch") ||
        path.startsWith("/purchaseorder") ||
        path.startsWith("/purchasinghistory") ||
        path.startsWith("/neraca")
      ) {
        return NextResponse.redirect(new URL("/dashboard", request.url));
      }
    } else if (role === "HEAD_WAREHOUSE") {
      if (
        path.startsWith("/order") ||
        path.startsWith("/orderreport") ||
        path.startsWith("/customer") ||
        path.startsWith("/account") ||
        path.startsWith("/neraca")
      ) {
        return NextResponse.redirect(new URL("/dashboard", request.url));
      }
    } else if (role === "FINANCE") {
      if (
        path.startsWith("/warehouse") ||
        path.startsWith("/supplier") ||
        path.startsWith("/order") ||
        path.startsWith("/customer") ||
        path.startsWith("/account")
      ) {
        return NextResponse.redirect(new URL("/dashboard", request.url));
      }
    }
  }
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/orderreport/:path*",
    "/products/:path*",
    "/batch/:path*",
    "/purchaseorder/:path*",
    "/purchasinghistory/:path*",
    "/neraca/:path*",
    "/warehouse/:path*",
    "/supplier/:path*",
    "/order/:path*",
    "/customer/:path*",
    "/account/:path*",
  ],
};
