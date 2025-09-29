import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

const protectedRoutes: RegExp[] = [
  /^\/shipping-address$/,
  /^\/payment-method$/,
  /^\/place-order$/,
  /^\/user(\/|$)/,
  /^\/order(\/|$)/,
  /^\/admin(\/|$)/,
];

export default async function middleware(req: NextRequest) {
  const { pathname, search } = req.nextUrl;
  const isProtected = protectedRoutes.some((re) => re.test(pathname));

  const token = await getToken({ req });

  if (isProtected && !token) {
    const url = new URL("/sign-in", req.url);

    url.searchParams.set("callbackUrl", pathname + search);

    return NextResponse.redirect(url);
  }

  if (!req.cookies.get("sessionCartId")) {
    const res = NextResponse.next();

    res.cookies.set("sessionCartId", crypto.randomUUID(), {
      httpOnly: true,
      sameSite: "lax",
      path: "/",
    });

    return res;
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/shipping-address",
    "/payment-method",
    "/place-order",
    "/user/:path*",
    "/order/:path*",
    "/admin/:path*",
  ],
};
