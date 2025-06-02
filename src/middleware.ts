// middleware.ts
import { withAuth } from "next-auth/middleware";


export default withAuth({
  callbacks: {
    authorized: ({ token,req }) => {
      const {pathname} = req.nextUrl;
       if(!token) return false;
       if(pathname.startsWith('/dashboard')&& token.email !== "toewailyun6@email.com"){
        return false;
       }
       return true;
    },
  },
  pages: {
    signIn: "/login", 
  },
});

export const config = {
  matcher: ["/dashboard/:path*"],
};
