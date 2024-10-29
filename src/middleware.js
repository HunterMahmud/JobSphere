import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

const secret = process.env.NEXT_PUBLIC_AUTH_SECRET;

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
  "/dashboard/userManagement/api/allUsers": ["admin"],
  "/dashboard/jobManagement/api": ["admin"],
  "/api/dashBoardOverview": ["admin", "recruiter", "seeker"],
  "/api/deleteSavedJobs/:id": ["seeker"],
  "/api/getSaveJobs/:email": ["seeker"],
  "/api/saveJob": ["seeker"],
};

// Define public routes that anyone can access
const publicRoutes = [
  "/login",
  "/register",
  "/register-recruiter",
  "/register-user",
  "/aboutus",
  "/profile",
  "/blogs",
  "/companies",
  "/api/companiesName",
  "/api/getReviews",
  "/api/auth/session",
  "/api/auth",
];

export const middleware = async (request) => {
  const pathname = request.nextUrl.pathname;
  // Allow all API routes without role checks
  // if (pathname.includes("api")) {
  //   return NextResponse.next();
  // }
  // Allow access to public routes
  if (publicRoutes.some((route) => pathname.startsWith(route))) {
    return NextResponse.next();
  }

  // Get the token for logged-in users
  const token = await getToken({ req: request, secret });

  // Redirect to login if user is not authenticated
  if (!token) {
    return NextResponse.redirect(new URL(`/login?redirect=${pathname}`, request.url));
  }

  try {
    const userRole = token.role; // Extract role from the token

    // Check if the route requires a specific role and the user doesn't have it
    const allowedRoles = roleBasedRoutes[pathname];
    if (allowedRoles && !allowedRoles.includes(userRole)) {
      return NextResponse.redirect(new URL("/unauthorized", request.url));
    }

    // If no restrictions are violated, proceed
    return NextResponse.next();
  } catch (error) {
    console.error("Error decoding token:", error);
    return NextResponse.redirect(new URL(`/login?redirect=${pathname}`, request.url));
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
    "/companies/:id/:path*",
    "/api/:path*",
    "/dashboard/userManagement/api:path*",
  ],
};
