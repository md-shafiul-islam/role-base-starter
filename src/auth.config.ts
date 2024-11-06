import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

import { isEmptyOrNull } from "@/src/app/components/utils/Action/esFunc/gen-es/esCheckFunc";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import { esFrontLogger } from "@/src/utils/es-loger/esFrontLogger";

const actionURL = process.env.API_BASE_LINK;

const getCurrentUserBySessionOrToken = (jwtToken: string) => {
  if (jwtToken) {
    const token = jwtToken.split(" ");

    if (Array.isArray(token)) {
      if (token[0] === "Bearer") {
        const decodedJwtToken = jwtDecode(token[1]);
        return decodedJwtToken;
      }
    }
  }
  return {};
};

export default {
  providers: [
    Credentials({
      name: "credentials",
      authorize: async (credentials) => {
        try {
          const loginData = {
            username: credentials?.username,
            pwd: credentials?.password,
          };

          const loginResp = await axios.post(
            `${actionURL}/users/login`,
            loginData
          );

          const { response, status, message } = loginResp.data;
          if (status) {
            return {
              token: response,
              user: getCurrentUserBySessionOrToken(response),
              success: true,
            };
          }
        } catch (error) {
          esFrontLogger.info("Auth User Login Error ", error);
        }

        return null;
      },
    }),

    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],

  callbacks: {
    async jwt({ token, user, account, isNewUser }) {
      esFrontLogger.info("Callback JWT Token, ", token);
      esFrontLogger.info("Callback JWT account ", account);
      esFrontLogger.info("callback, JWT isNewUser ", isNewUser);
      esFrontLogger.info("callback, JWT user ", user);

      if (!isEmptyOrNull(user)) {
        esFrontLogger.info("callback, JWT user Status ", user?.success);

        if (user?.success) {
          token = { accessToken: user?.token };
        }
      }

      return token;
    },

    async session({ session, token }) {
      esFrontLogger.info("Callback session, session ", session);
      esFrontLogger.info("Callback session, token, ", token);

      session.accessToken = token?.accessToken;
      session.user = getCurrentUserBySessionOrToken(token?.accessToken);
      return session;
    },

    async redirect({ url, baseUrl }) {
      esFrontLogger.info("redirect: Current Url, ", url);
      return baseUrl;
    },

    async signIn({ account, profile }) {
      esFrontLogger.info("Sign IN account, ", account);
      esFrontLogger.info("Sign IN profile, ", profile);
      if (account.provider === "google") {
        //esFrontLogger.info("Google sign in Account ", account);
        //esFrontLogger.info("Google sign in profile ", profile);
        return profile.email_verified && profile.email.endsWith("@gmail.com");
      }
      return true; // Do different verification for other providers that don't have `email_verified`
    },
  },
  trustHost: true,
  pages: {
    signIn: "/signin",
  },
} satisfies NextAuthConfig;
