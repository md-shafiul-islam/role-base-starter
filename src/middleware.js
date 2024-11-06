import authConfig from "@/src/auth.config";
import NextAuth from "next-auth";

export const { auth } = NextAuth(authConfig);

import { NextResponse } from "next/server";

import { isEmptyOrNull, isTokenExpires } from "@/src/app/components/utils/Action/esFunc/gen-es/esCheckFunc";
import { signOut } from "next-auth/react";

// import { esBackLogger } from "@/src/utils/es-loger/es.back.logger";

export async function middleware(req, event) {
  const urlPath = req.nextUrl.pathname;
  // const pathPart = req.nextUrl.pathname

  if (
    urlPath.startsWith("/administrator") ||
    urlPath.startsWith("/api/administrator")
  ) {
    const session = await auth();
    // esBackLogger.info("middleware User Session, ", session);
    if (isEmptyOrNull(session?.accessToken)) {
      if (!isTokenExpires(session?.expires)) {
        // signOut(true);
        // return NextResponse.redirect(new URL("/thanks", req.url));
      }
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/(api|trpc)(.*)", "/((?!.+\\.[\\w]+$|_next).*)"],
};
