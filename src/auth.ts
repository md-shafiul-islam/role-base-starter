import NextAuth from "next-auth";
import authConfig from "@/src/auth.config";

export const {
  auth,
  handlers: { GET, POST },
  signIn,
  signOut,
} = NextAuth({ session: { strategy: "jwt" }, ...authConfig });
