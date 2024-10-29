import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

const secret = process.env.NEXT_PUBLIC_AUTH_SECRET; // Use your NextAuth secret

// Define route-role mapping
const roleBasedRoutes = {
  "/dashboard": ["admin", "recruiter", "seeker"],
  "/profile": ["recruiter", "seeker"],
  "/dashboard/statistics": ["admin"],
  "/dashboard/userManagement": ["admin"],
  "/dashboard/jobManagement": ["admin"],
  "/dashboard/postAJob": ["recruiter"],
  "/dashboard/myPostedJobs": ["recruiter"],
  "/dashboard/writeABlog": ["recruiter"],
  "/profile/company-information": ["recruiter"],
  "/profile/contact-information": ["recruiter"],
  "/profile/employment-information": ["recruiter"],
  "/dashboard/appliedJobs": ["seeker"],
  "/dashboard/savedJobs": ["seeker"],
  // Add more routes and their respective allowed roles here
  "/blogs/[id]": ["admin", "recruiter", "seeker"],
  "/jobs/[id]": ["admin", "recruiter", "seeker"], // Role-based access for dynamic job details
  "/companies/[id]": ["admin", "recruiter", "seeker"],
  "/profile": ["recruiter", "seeker"],
  "/dashboard/userManagement/api/allUsers": ["admin"],
  "/dashboard/jobManagement/api": ["admin"],
  "/api/blog/[id]": ["admin", "recruiter", "seeker"],
  "/api/dashBoardOverview": ["admin", "recruiter", "seeker"],
  "/api/deleteSavedJobs/[id]": ["seeker"],
  "/api/getSaveJobs/[email]": ["seeker"],
  "/api/saveJob": ["seeker"],
  "/blogs/api/[id]": ["admin", "recruiter", "seeker"],
  "/companies/api/[id]": ["admin", "recruiter", "seeker"],
  "/jobs/api/[id]": ["admin", "recruiter", "seeker"],
};

// Define public routes that anyone can access
const publicRoutes = [
  "/home",
  "/about",
  "/jobs/api",
  "/blogs/api",
  "/blogs/highlightedBlogs/api",
  "/companies/api",
  "/api/companiesName",
  "/api/getReviews",
  "/api/auth/session",
  "/authentication/login",
  "/authentication/register",
  "/authentication/register-recruiter",
  "/authentication/api/auth/[...nextauth]",
  "/login"
];

export const middleware = async (request) => {
  const pathname = request.nextUrl.pathname;

  // Check if the route is in publicRoutes
  if (publicRoutes.some((route) => pathname.startsWith(route))) {
    return NextResponse.next();
  }

  // Allow all API routes without role checks
  if (pathname.includes("api")) {
    return NextResponse.next();
  }

  // Get the token for logged-in users
  const token = await getToken({ req: request, secret });

  // If no token is found, redirect to login page
  if (!token) {
    return NextResponse.redirect(
      new URL(`/login?redirect=${pathname}`, request.url)
    );
  }

  try {
    const userRole = token.role; // Extract role from the token

    // Check if the route requires a specific role and the user doesn't have it, redirect
    const allowedRoles = roleBasedRoutes[pathname];
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
    "/blogs/:id/:path*",
    "/jobs/:id/:path*", 
    "/jobs/api/:id/:path*", 
    "/companies/:id/:path*",
    "/companies/api/:id/:path*",
    "/api/:path*",
    "/dashboard/userManagement/api:path*",
  ],
};
