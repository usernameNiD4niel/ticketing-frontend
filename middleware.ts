import { NextRequest, NextResponse } from "next/server";

function handleUserIT(url: string, pathname: string, it_access_level?: string) {
  if (it_access_level?.toLowerCase() === "requestor") {
    if (pathname === "/department/it/overview") {
      return NextResponse.redirect(new URL("/", url));
    }

    if (pathname === "/department/it/pending-role") {
      return NextResponse.redirect(new URL("/", url));
    }

    if (pathname === "/department/it/unhandled-tickets") {
      return NextResponse.redirect(new URL("/", url));
    }
  }

  if (
    it_access_level?.toLowerCase() !== "supreme" &&
    pathname === "/department/it/code"
  ) {
    return NextResponse.redirect(new URL("/", url));
  }

  if (
    it_access_level?.toLowerCase() === "requestor" ||
    it_access_level?.toLowerCase() === "unset" ||
    it_access_level?.toLowerCase() === "champion"
  ) {
    if (pathname === "/department/it/ticket-types") {
      return NextResponse.redirect(new URL("/department/it", url));
    }
  }
}

function handleUserHR(url: string, pathname: string, hr_access_level?: string) {
  // * Restrict the page to the requestor --- the page of champion and catalyst
}

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;
  const pathname = request.nextUrl.pathname; // get the pathname of the page
  const it_access_level = request.cookies.get("it_access_level")?.value; // get the access_level of the current user
  const hr_access_level = request.cookies.get("hr_access_level")?.value;

  // * The current user is accessing other page beside login and register route

  if (it_access_level?.toLowerCase() === "unset") {
    //* we don't add hr since user approver is came from IT dept
    const name = request.cookies.get("name")?.value;
    const email = request.cookies.get("email")?.value;
    return NextResponse.redirect(
      new URL(
        `/department/pending-user?user=${name}&email=${email}`,
        request.url
      )
    );
  }

  // * Checking if user is autheticated --- redirect them to authenticated page
  if (pathname === "/login" || pathname === "/register") {
    if (token && token.length > 10) {
      return NextResponse.redirect(new URL("/", request.url));
    } else {
      return NextResponse.next();
    }
  }

  // * Check if the user wasn't authenticated --- redirect then to login page
  if (!token) {
    return NextResponse.redirect(new URL("/login", request.url)); // redirect user that is not authenticated
  }

  // * If user accessing the IT module --- identify the level of user
  if (pathname.startsWith("/department/it")) {
    const it_status = request.cookies.get("it_status")?.value;
    if (it_status === "deactivate") {
      return NextResponse.redirect(
        new URL("/?disable=true&module=IT", request.url)
      );
    }
    handleUserIT(request.url, pathname, it_access_level);
  } else if (pathname.startsWith("/department/hr")) {
    const hr_status = request.cookies.get("hr_status")?.value;
    // * Means the current user is restricted to enter to the hr system
    if (hr_status === "deactivate") {
      return NextResponse.redirect(
        new URL("/?disable=true&module=IT", request.url)
      );
    }

    handleUserHR(request.url, pathname, hr_access_level);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    // * public pages
    "/login",
    "/register",

    // * Landing Page - Private
    "/",

    // * IT Module - Private
    "/department/it",
    "/department/it/overview",
    "/department/it/pending-role",
    "/department/it/unhandled-tickets",
    "/department/it/code",
    "/department/it/ticket-types",

    // * HR Module - Private
    "/department/hr",
  ],
};
