// Temporarily disabled Clerk middleware
// import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// const isPublicRoute = createRouteMatcher([
//   "/",
//   "/sign-in(.*)",
//   "/sign-up(.*)", 
//   "/api/public(.*)",
// ]);

// export default clerkMiddleware((auth, req) => {
//   if (isPublicRoute(req)) return;
//   
//   // Protect all other routes
//   auth.protect();
// });

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Allow all requests for now
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next|static|favicon.ico).*)",
    "/api/(.*)"
  ],
};
