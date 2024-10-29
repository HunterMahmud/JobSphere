// Extend route-role mapping to include API routes
const roleBasedRoutes = {
  "/dashboard": ["admin", "recruiter", "seeker"],
  "/blogs/[id]": ["admin", "recruiter", "seeker"],
  "/jobs/[id]": ["admin", "recruiter", "seeker"],
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
  // Define role-based access for API routes
  "/api/admin/data": ["admin"],
  "/api/blog/[id]": ["admin", "recruiter", "seeker"],
  "/api/dashBoardOverview": ["admin", "recruiter", "seeker"],
  "/api/deleteSavedJobs/[id]": ["seeker"],
  "/api/getSaveJobs/[email]": ["seeker"],
  "/api/saveJob/": ["seeker"],
  "/blogs/api/[id]":["admin", "recruiter", "seeker"],
  "/companies/api/[id]":["admin", "recruiter", "seeker"],
  "/jobs/api/[id]":["admin", "recruiter", "seeker"],
};

// Modify the middleware to check API routes with roles
export const middleware = async (request) => {
  const pathname = request.nextUrl.pathname;

  // Get the token using NextAuth's getToken method
  const token = await getToken({ req: request, secret });

  // If no token is found, redirect to login page
  if (!token) {
    return NextResponse.redirect(
      new URL(`/login?redirect=${pathname}`, request.url)
    );
  }

  try {
    const userRole = token.role;

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
    return NextResponse.redirect(
      new URL(`/login?redirect=${pathname}`, request.url)
    );
  }
};

// Matcher for middleware to include API routes
export const config = {
  matcher: [
    "/dashboard/:path*",
    "/profile/:path*",
    "/api/:path*",
    "/api/recruiter/:path*",
    "/api/blog/[id]/:path*",
    "/api/role/[id]/:path*",
  ],
};
