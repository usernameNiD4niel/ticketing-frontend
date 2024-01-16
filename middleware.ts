import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;
  const pathname = request.nextUrl.pathname; // get the pathname of the page
  const access_level = request.cookies.get("it_access_level")?.value; // get the access_level of the current user

  // * The current user is accessing other page beside login and register route

  if (access_level?.toLowerCase() === "unset") {
    const name = request.cookies.get("name")?.value;
    const email = request.cookies.get("email")?.value;
    return NextResponse.redirect(
      new URL(
        `/department/pending-user?user=${name}&email=${email}`,
        request.url
      )
    );
  }

  if (pathname === "/login" || pathname === "/register") {
    if (token && token.length > 10) {
      return NextResponse.redirect(new URL("/", request.url));
    } else {
      return NextResponse.next();
    }
  }

  if (!token) {
    return NextResponse.redirect(new URL("/login", request.url)); // redirect user that is not authenticated
  }

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

  if (
    access_level?.toLowerCase() === "requestor" ||
    access_level?.toLowerCase() === "unset" ||
    access_level?.toLowerCase() === "champion"
  ) {
    if (pathname === "/department/it/ticket-types") {
      return NextResponse.redirect(new URL("/department/it", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/",
    "/login",
    "/register",
    "/department/it",
    "/department/it/overview",
    "/department/it/pending-role",
    "/department/it/unhandled-tickets",
    "/department/it/code",
    "/department/it/ticket-types",
  ],
};
