import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { type NextRequest, NextResponse } from "next/server";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const createClient = (request: NextRequest) => {
  // Create an unmodified response
  let supabaseResponse = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  const supabase = createServerClient(
    supabaseUrl!,
    supabaseKey!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => request.cookies.set(name, value))
          supabaseResponse = NextResponse.next({
            request,
          })
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          )
        },
      },
    },
  );

  return supabaseResponse
};

// Suspicious path patterns detected by Google Security
// These are known malicious paths that should be blocked
const SUSPICIOUS_PATHS = [
  '/-nordazldldm/',
  '/cdisps/',
  '/csmspppocad/',
  '/homepqk/',
  '/mordatillo/',
  '/qmqpoqt/',
  '/securess/',
  '/F004f19441/',
  '00951124a.php',
];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  const isSuspicious = SUSPICIOUS_PATHS.some(path => pathname.includes(path)) ||
    pathname.endsWith('.php') ||
    // Block paths with suspicious query parameters that match malicious patterns
    (pathname.includes('F004f19441') && pathname.includes('00951124a.php'));
  
  if (isSuspicious) {
    return new NextResponse(null, {
      status: 404,
      headers: {
        'X-Robots-Tag': 'noindex, nofollow',
        'Cache-Control': 'no-store, no-cache, must-revalidate',
      },
    });
  }
  
  // Refresh session if expired - required for Server Components
  const response = createClient(request);
  
  // IMPORTANT: Avoid writing any logic between createClient and return
  // The createClient function is responsible for handling cookies and headers
  
  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * Feel free to modify this pattern to include more paths.
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
