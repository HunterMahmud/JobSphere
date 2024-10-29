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
  "/dashboard/supportAllUsers": ["admin"],
  "/dashboard/postAJob": ["recruiter"],
  "/dashboard/myPostedJobs": ["recruiter"],
  "/dashboard/myPostedJobs/:id": ["recruiter"],
  "/dashboard/writeABlog": ["recruiter"],
  "/dashboard/": ["recruiter"],
  "/profile/company-information": ["recruiter"],
  "/profile/contact-information": ["recruiter"],
  "/profile/employment-information": ["recruiter"],
  "/dashboard/appliedJobs": ["seeker"],
  "/dashboard/savedJobs": ["seeker"],  
  "/dashboard/support": ["seeker", "recruiter"],  
  // api
  "/dashboard/userManagement/api/allUsers": ["admin"],
  "/dashboard/userManagement/api/deleteUser/:email": ["admin"],
  "/dashboard/userManagement/api/manageStatus": ["admin"],
  "/dashboard/statistics/api/BarChart": ["admin"],
  "/dashboard/statistics/api/lineChart": ["admin"],
  "/dashboard/statistics/api/Overview": ["admin"],
  "/dashboard/jobManagement/api/allJobs": ["admin"],
  "/dashboard/jobManagement/api/jobStatus": ["admin"],
  "/dashboard/myPostedJobs/api/applyedJob/:id": ["recruiter"],
  "/dashboard/myPostedJobs/api/update/:id": ["recruiter"],
  "/dashboard/myPostedJobs/api/postedJobs/:email": ["recruiter"],
  "/dashboard/myPostedJobs/api/sendEmail/jobOffer": ["recruiter"],
  "/dashboard/myPostedJobs/api/sendEmail/offlineInterView": ["recruiter"],
  "/dashboard/myPostedJobs/api/sendEmail/onlineInterView": ["recruiter"],
  "/dashboard/postAJob/api": ["recruiter"],
  "/dashboard/writeABlog/api": ["recruiter"],

   


  "/api/dashBoardOverview": ["admin", "recruiter", "seeker"],
  "/api/reviews": ["admin", "recruiter", "seeker"],
  "/api/deleteSavedJobs/:id": ["seeker"],
  "/api/blog/:id": ["admin", "recruiter", "seeker"],
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
  "/jobs/api",
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
    "/api/:path*",
    "/dashboard/userManagement/api:path*",
    "/dashboard/statistics/api:path*",
    "/dashboard/jobManagement/api:path*",
    "/dashboard/writeABlog:path*",
    "/dashboard/postAJob:path*",
  ],
};
