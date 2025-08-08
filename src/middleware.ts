import { NextResponse, NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const isPublicPath = path === "/login" || path === "/signup";
  const token = request.cookies.get("auth-token")?.value || "";

  console.log(
    "Middleware - Path:",
    path,
    "Token:",
    token ? "exists" : "missing",
    "IsPublic:",
    isPublicPath
  );

  if (isPublicPath && token) {
    console.log("Redirecting to /profile from public path");
    return NextResponse.redirect(new URL("/profile", request.nextUrl));
  }
  if (!isPublicPath && !token) {
    console.log("Redirecting to /login from protected path");
    return NextResponse.redirect(new URL("/login", request.nextUrl));
  }
}

export const config = {
  matcher: ["/", "/profile", "/login", "/signup"],
};
