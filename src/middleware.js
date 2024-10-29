import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

const secret = process.env.NEXT_PUBLIC_AUTH_SECRET; // Use your NextAuth secret

// Define route-role mapping including dynamic API routes
const roleBasedRoutes = {
  "/dashboard": ["admin", "recruiter", "seeker"],
  "/blogs/[id]": ["admin", "recruiter", "seeker"],
  "/jobs/[id]": ["admin", "recruiter", "seeker"], // Role-based access for dynamic job details
  "/companies/[id]": ["admin", "recruiter", "seeker"],
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
  "/api/blog/[id]": ["admin", "recruiter", "seeker"],
  "/api/dashBoardOverview": ["admin", "recruiter", "seeker"],
  "/api/deleteSavedJobs/[id]": ["seeker"],
  "/api/getSaveJobs/[email]": ["seeker"],
  "/api/saveJob": ["seeker"],
  "/blogs/api/[id]": ["admin", "recruiter", "seeker"],
  "/companies/api/[id]": ["admin", "recruiter", "seeker"],
  "/jobs/api/[id]": ["admin", "recruiter", "seeker"],
};

// Define public routes that anyone can access, including the main /jobs page
const publicRoutes = [
  "/home",           // Public home page
  "/about",
  "/jobs/api",          // Public about page
  "/blogs/api",          // Public about page
  "/blogs/highlightedBlogs/api",          // Public about page
  "/jobs/api",          // Public about page
  "/companies/api",
  "/api/companiesName",
  "/api/getReviews"          
  // Example public API route
];

export const middleware = async (request) => {
  const pathname = request.nextUrl.pathname;

  // Check if the route is in publicRoutes, if so allow access
  if (publicRoutes.some((route) => pathname.startsWith(route))) {
    return NextResponse.next();
  }

  // Get the token for logged-in users
  const token = await getToken({ req: request, secret });

  // Redirect to login if no token is found for non-public routes
  if (!token) {
    return NextResponse.redirect(
      new URL(`/login?redirect=${pathname}`, request.url)
    );
  }

  try {
    const userRole = token.role;

    // Find role-based route using regex for dynamic segments
    const matchedRoute = Object.keys(roleBasedRoutes).find((route) => {
      const regex = new RegExp(`^${route.replace(/\[.*?\]/g, '[^/]+')}$`);
      return regex.test(pathname);
    });

    // Check if user has a role allowed for the matched route
    const allowedRoles = matchedRoute ? roleBasedRoutes[matchedRoute] : null;
    if (allowedRoles && !allowedRoles.includes(userRole)) {
      return NextResponse.redirect(new URL("/unauthorized", request.url));
    }

    return NextResponse.next();
  } catch (error) {
    console.error("Error decoding token:", error);
    return NextResponse.redirect(
      new URL(`/login?redirect=${pathname}`, request.url)
    );
  }
};

// Matcher configuration for middleware to include dynamic and API routes
export const config = {
  matcher: [
    "/dashboard/:path*",
    "/profile/:path*",
    "/blogs/:id/:path*",
    "/jobs/:id/:path*", 
    "/jobs/api/:id/:path*", 
    "/companies/:id/:path*",
    "/api/:path*",
  ],
};
