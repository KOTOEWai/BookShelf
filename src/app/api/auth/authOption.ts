import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { compare } from "bcryptjs";

import connectToMongo from "@/lib/db";
import User from "@/models/user";

export const authOptions: AuthOptions = {
  session: {
    strategy: "jwt", // jsonWebtoken 
  },

  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),

    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) {
          throw new Error("Missing email or password");
        }

        await connectToMongo();
        const user = await User.findOne({ email: credentials.email });
        if (!user) throw new Error("User not found");

        const isMatch = await compare(credentials.password, user.password);
        if (!isMatch) throw new Error("Invalid credentials");

        return {
          id: user._id.toString(),
          email: user.email,
          name: user.name,
          image: user.image,
          role: user.role,
        };
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user, account }) {
      // When signing in
      if (user) {
        token.id = (user as any).id;
        token.email = user.email;
        token.name = user.name;
        token.image = user.image;
        token.role = (user as any).role ?? "user";
      }

      // Google Login
      if (account?.provider === "google") {
        await connectToMongo();
        let existingUser = await User.findOne({ email: token.email });

        if (!existingUser) {
          existingUser = await User.create({
            name: token.name,
            email: token.email,
            image: token.picture ?? token.image,
            role: "user",
            password: "google_oauth",
          });
        }
        token.id = existingUser._id.toString();
        token.role = existingUser.role;
        token.image = existingUser.image;
      }

      return token;
    },

    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.email = token.email;
        session.user.name = token.name;
        session.user.image = token.image;
        session.user.role = token.role;
      }
      return session;
    },
  },

  secret: process.env.NEXTAUTH_SECRET,
};
