import { withAuth } from "next-auth/middleware";  // NextAuth မှာပါဝင်တဲ့ function တစ်ခုပဲ ဒီ function ကိုသုံးပြီး user login ဖြစ်/မဖြစ် စစ်နိုင်တယ်။
import { NextResponse } from "next/server";



export default withAuth(
  function proxy(req) {
    const token = req.nextauth.token;
    const { pathname } = req.nextUrl;
    // 🚫 1. Block completely if user not logged in
    if (!token) {
      return NextResponse.redirect(new URL("/login", req.url));
    }

    // ✅ 2. Role-based or email-based access control
    const userEmail = token.email;
    const userRole = (token as any).role || "user"; // example: role stored in token

    // Example: only specific email or role can access admin/dashboard routes
    const isDashboardRoute = pathname.startsWith("/dashboard");

    if (isDashboardRoute) {
      const allowedAdmins = ["toewailyun6@gmail.com", "admin@gmail.com"];
      const allowedRoles = ["admin", "superadmin"];

      if (!allowedAdmins.includes(userEmail!) && !allowedRoles.includes(userRole)) {
        // Optional: redirect to custom "Access Denied" page
        return NextResponse.redirect(new URL("/unauthorized", req.url));
      }
    }
     
    // ✅ Allow all other authenticated routes
    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token, // quick check before entering middleware
    },
    pages: {
      signIn: "/login",
    },
  }
);

export const config = {
  matcher: ["/dashboard/:path*", "/admin/:path*"], // easily extendable
};
