// TODO: Implement the code here to add rate limiting with Redis
// Refer to the Next.js Docs: https://nextjs.org/docs/app/building-your-application/routing/middleware
// Refer to Redis docs on Rate Limiting: https://upstash.com/docs/redis/sdks/ratelimit-ts/algorithms

// import { NextResponse } from "next/server";
// import type { NextRequest } from "next/server";
// import { Redis } from "@upstash/redis";
// import { Ratelimit } from "@upstash/ratelimit";

// const redis = new Redis({
//   url: process.env.UPSTASH_REDIS_REST_URL,
//   token: process.env.UPSTASH_REDIS_REST_TOKEN,
// });

// const rateLimit = new Ratelimit({
//   redis: redis,
//   limiter: Ratelimit.slidingWindow(10, "60 s"),
//   analytics: true,
// });

// export async function middleware(request: NextRequest) {
//   try {
//     const ip = request.headers.get("x-forwarded-for") ?? "127.0.0.1";

//     const { success, limit, reset, remaining } = await rateLimit.limit(ip);

//     // Return response with rate limit headers
//     const response = success
//       ? NextResponse.next()
//       : NextResponse.json({ error: "Too Many Requests" }, { status: 429 });

//     // Add rate limit info to response headers
//     response.headers.set("X-RateLimit-Limit", limit.toString());
//     response.headers.set("X-RateLimit-Remaining", remaining.toString());
//     response.headers.set("X-RateLimit-Reset", reset.toString());

//     return response;
//   } catch (error) {
//     console.error("Error in middleware");
//     return NextResponse.next();
//   }
// }

// // Configure which paths the middleware runs on
// export const config = {
//   matcher: [
//     /*
//      * Match all request paths except static files and images
//      */
//     "/((?!_next/static|_next/image|favicon.ico).*)",
//   ],
// };

// import { NextResponse } from "next/server";
// import type { NextRequest } from "next/server";
// import { Redis } from "@upstash/redis";
// import { Ratelimit } from "@upstash/ratelimit";

// const redis = new Redis({
//   url: process.env.UPSTASH_REDIS_REST_URL,
//   token: process.env.UPSTASH_REDIS_REST_TOKEN,
// });

// const rateLimit = new Ratelimit({
//   redis: redis,
//   limiter: Ratelimit.slidingWindow(20, "10 s"), // Burst: 20 requests per 10 seconds
//   analytics: true,
// });

// export async function middleware(request: NextRequest) {
//   try {
//     const ip = request.headers.get("x-forwarded-for") ?? "127.0.0.1";

//     const { success, limit, reset, remaining } = await rateLimit.limit(ip);

//     // Return response with rate limit headers
//     const response = success
//       ? NextResponse.next()
//       : NextResponse.json({ error: "Too Many Requests" }, { status: 429 });

//     // Add rate limit info to response headers
//     response.headers.set("X-RateLimit-Limit", limit.toString());
//     response.headers.set("X-RateLimit-Remaining", remaining.toString());
//     response.headers.set("X-RateLimit-Reset", reset.toString());

//     return response;
//   } catch (error) {
//     console.error("Error in middleware:", error);
//     return NextResponse.next(); // Allow request to proceed in case of error
//   }
// }

// // Configure which paths the middleware runs on
// export const config = {
//   matcher: [
//     /*
//      * Match all request paths except static files and images
//      */
//     "/((?!_next/static|_next/image|favicon.ico).*)",
//   ],
// };

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { Redis } from "@upstash/redis";
import { Ratelimit } from "@upstash/ratelimit";

// Initialize Redis instance
const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL,
  token: process.env.UPSTASH_REDIS_REST_TOKEN,
});

// Configure rate limiter to allow a set number of messages per hour
const rateLimit = new Ratelimit({
  redis: redis,
  limiter: Ratelimit.slidingWindow(200, "1 h"), // 100 requests per hour
  analytics: true,
});

export async function middleware(request: NextRequest) {
  try {
    // Identify the user based on their IP address (or use a user-specific identifier if available)
    const userIdentifier =
      request.headers.get("x-forwarded-for") ?? "127.0.0.1";

    // Check the user's rate limit
    const { success, limit, reset, remaining } =
      await rateLimit.limit(userIdentifier);

    if (!success) {
      // If rate limit exceeded, return an error response
      return NextResponse.json(
        {
          error: "Too many requests. Please wait before sending more messages.",
        },
        { status: 429 }
      );
    }

    // Include rate limit information in the headers for the response
    const response = NextResponse.next();
    response.headers.set("X-RateLimit-Limit", limit.toString());
    response.headers.set("X-RateLimit-Remaining", remaining.toString());
    response.headers.set("X-RateLimit-Reset", reset.toString());

    return response;
  } catch (error) {
    console.error("Rate limit middleware error:", error);
    return NextResponse.next(); // Allow the request if there's an error
  }
}

// Apply the middleware to specific paths
export const config = {
  matcher: [
    /*
     * Match all request paths except static files and images
     */
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
};
