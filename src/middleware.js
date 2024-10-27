import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

const secret = process.env.NEXT_PUBLIC_AUTH_SECRET; // Use your NextAuth secret

// Define route-role mapping
const roleBasedRoutes = {
  "/dashboard": ["admin", "recruiter", "seeker"],
  "/profile": ["recruiter", "seeker"],
  // "/dashboard/statistics": ["admin"],
  "/dashboard/userManagement": ["admin"],
  "/dashboard/jobManagement": ["admin"],
  // "/dashboard/interview": ["admin"],
  "/dashboard/postAJob": ["recruiter"],
  "/dashboard/myPostedJobs": ["recruiter"],
  "/dashboard/writeABlog": ["recruiter"],
  "/profile/company-information": ["recruiter"],
  "/profile/contact-information": ["recruiter"],
  "/profile/employment-information": ["recruiter"],
  "/dashboard/appliedJobs": ["seeker"],
  "/dashboard/savedJobs": ["seeker"],
  // Add more routes and their respective allowed roles here
};

export const middleware = async (request) => {
  const pathname = request.nextUrl.pathname;

  // Allow API routes without role checks
  if (pathname.includes("api")) {
    return NextResponse.next();
  }

  // Get the token using NextAuth's getToken method
  const token = await getToken({ req: request, secret });

  // If no token is found, redirect to login page
  if (!token) {
    return NextResponse.redirect(
      new URL(`/login?redirect=${pathname}`, request.url)
    );
  }

  try {
    const userRole = token.role; // Extract role from the token

    // Check if the route exists in the mapping
    const allowedRoles = roleBasedRoutes[pathname];

    // If the route requires a specific role and the user doesn't have it, redirect
    if (allowedRoles && !allowedRoles.includes(userRole)) {
      return NextResponse.redirect(new URL("/unauthorized", request.url));
    }

    // If no restrictions are violated, proceed
    return NextResponse.next();
  } catch (error) {
    console.error("Error decoding token:", error);
    // Redirect to login if token is invalid or malformed
    return NextResponse.redirect(
      new URL(`/login?redirect=${pathname}`, request.url)
    );
  }
};

// Define the matcher for the middleware
export const config = {
  matcher: [
    "/dashboard/:path*",
    "/profile/:path*",
    "/profile/company-information",
    "/profile/contact-information",
    "/profile/employment-information",
  ], // Match all routes under /dashboard
};

// // Define the matcher for the middleware
// export const config = {
//   matcher: [
//     "/dashboard",
//     "/dashboard/statistics",
//     "/dashboard/userManagement",
//     "/dashboard/jobManagement",
//     "/dashboard/interview",
//     "/dashboard/postAJob",
//     "/dashboard/myPostedJobs",
//     "/dashboard/jobSeekers",
//     "/dashboard/writeABlog",
//     "/dashboard/savedJobs",
//     "/dashboard/appliedJobs",
//     // Add more routes here if needed
//   ],
// };
