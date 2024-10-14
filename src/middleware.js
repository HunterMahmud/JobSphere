import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export const middleware = async (request) => {
  const token = cookies(request).get("next-auth.session-token");
  const pathname = request.nextUrl.pathname;
  if (pathname.includes("api")) {
    return NextResponse.next();
  }

  if (!token) {
    return NextResponse.redirect(
      new URL(`/login?redirect=${pathname}`, request.url)
    );
  }
  return NextResponse.next();
};

export const config = {
  matcher: ["/dashboard/:path*"],
};

//"use client"
// import { cookies } from "next/headers";
// import { NextResponse } from "next/server";
//import useRole from "../Hooks/useRole"

// export const middleware = async (request) => {
//   const token = cookies(request).get("next-auth.session-token");
//   const pathname = request.nextUrl.pathname;

//   // Allow API routes without role checks
//   if (pathname.includes("api")) {
//     return NextResponse.next();
//   }

//   // If no token is found, redirect to login page
//   if (!token) {
//     return NextResponse.redirect(
//       new URL(`/login?redirect=${pathname}`, request.url)
//     );
//   }

//   // Decode the token to get user details (replace this with your decoding logic)

//  const { loggedInUser } = useRole();

//   // Check if the user's role matches the required roles for specific routes
//   const userRole = loggedInUser?.role;

//   // Restrict access to admin-only pages
//   if (pathname.startsWith("/dashboard/admin") && userRole !== "admin") {
//     return NextResponse.redirect(new URL("/unauthorized", request.url));
//   }

//   // Restrict access to recruiter-only pages
//   if (pathname.startsWith("/dashboard/recruiter") && userRole !== "recruiter") {
//     return NextResponse.redirect(new URL("/unauthorized", request.url));
//   }

//   // Restrict access to seeker-only pages
//   if (pathname.startsWith("/dashboard/seeker") && userRole !== "seeker") {
//     return NextResponse.redirect(new URL("/unauthorized", request.url));
//   }

//   // Allow the request to proceed if no role restrictions are violated
//   return NextResponse.next();
// };

// // Define the matcher for role-based routes
// export const config = {
//   matcher: ["/dashboard/admin/:path*", "/dashboard/recruiter/:path*", "/dashboard/seeker/:path*"],
// };
