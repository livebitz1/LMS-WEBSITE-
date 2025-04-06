import { clerkMiddleware } from "@clerk/nextjs/server";

export default clerkMiddleware();

// Define the matcher array correctly without spread operator
export const config = {
  matcher: [
    // Skip Next.js internals and static assets
    "/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml).*)",

    // Always run middleware for API routes
    "/api/:path*",

    // Protect all routes except public ones
    "/((?!public).*)", // Adjust this if you have more public routes
  ],
};
