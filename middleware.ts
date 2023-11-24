import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;

  if (!token) {
    return NextResponse.redirect(new URL("/login", request.url)); // redirect user that is not authenticated
  }

  const pathname = request.nextUrl.pathname; // get the pathname of the page
  const access_level = request.cookies.get("it_access_level")?.value; // get the access_level of the current user

  // if regular user access the restricted page --- redirect them
  if (
    access_level?.toLowerCase() === "unset" ||
    access_level?.toLowerCase() === "requestor"
  ) {
    if (pathname === "/department/it/overview") {
      return NextResponse.redirect(new URL("/", request.url));
    }

    if (pathname === "/department/it/pending-role") {
      return NextResponse.redirect(new URL("/", request.url));
    }

    if (pathname === "/department/it/unhandled-tickets") {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  if (
    access_level?.toLowerCase() !== "supreme" &&
    pathname === "/department/it/code"
  ) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/",
    "/department/it/overview",
    "/department/it/pending-role",
    "/department/it/unhandled-tickets",
    "/department/it/code",
  ],
};
