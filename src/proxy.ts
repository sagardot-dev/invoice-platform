import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { headers } from "next/headers";
import { auth } from "./lib/auth";

const protectRoute = [
  "/dashboard/:path*",
  "/invoices/:path*",
  "/pdf/:path*",
  "/sale-men/:path*",
  "/sale-revenue/:path*",
];

// This function can be marked `async` if using `await` inside
export async function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  const isProtected = protectRoute.some((route) => pathname.startsWith(route));
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session && isProtected) {
    return NextResponse.redirect(new URL("/auth/sign-in", request.url));
  }
  return NextResponse.next();
}

// Alternatively, you can use a default export:
// export default function proxy(request: NextRequest) { ... }

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    "/dashboard/:path*",
    "/invoices/:path*",
    "/pdf/:path*",
    "/sale-men/:path*",
    "/sale-revenue/:path*",
  ],
};
