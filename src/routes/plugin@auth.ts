import { serverAuth$ } from "@builder.io/qwik-auth";
import GitHub from "@auth/core/providers/github";
import Facebook from "@auth/core/providers/facebook";
import type { Provider } from "@auth/core/providers";
import mongoClientPromise from "../utils/mongodbinit";
import type { GoogleProfile } from "@auth/core/providers/google";
import Google from "@auth/core/providers/google";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import type { Adapter } from "@auth/core/adapters";

export const { onRequest, useAuthSession, useAuthSignin, useAuthSignout } =
  serverAuth$(() => ({
    session: {
      strategy: "database",
      maxAge: 60 * 60 * 24 * 7, // 1 week
      updateAge: 60 * 60 * 24, // 1 day
    },
    adapter: MongoDBAdapter(mongoClientPromise, { databaseName: "testing" }) as Adapter,
    secret: process.env.AUTH_SECRET,
    trustHost: true,
    providers: [
      Google({
        clientId: process.env.GOOGLE_ID,
        clientSecret: process.env.GOOGLE_SECRET,
        profile(profile: GoogleProfile) {
          return {
            id: profile.sub,
            theme: "auto", // custom attribute
            language: profile.language,
            image: profile.picture,
            emailVerified: profile.email_verified,
            ...profile,
          };
        },
      }),
      GitHub({
        clientId: process.env.GITHUB_OAUTH_CLIENT_ID,
        clientSecret: process.env.GITHUB_OAUTH_CLIENT_SECRET,
        profile(profile) {
          return {
            gh_username: profile.login,
            id: profile.id.toString(),
            name: profile.name || profile.login,
            email: profile.email,
            image: profile.avatar_url,
            theme: "auto", // custom attribute
            language: profile.language,
          };
        },
      }),
      Facebook({
        clientId: process.env.FACEBOOK_OAUTH_CLIENT_ID,
        clientSecret: process.env.FACEBOOK_OAUTH_CLIENT_SECRET,
        profile(profile) {
          return {
            id: profile.id.toString(),
            theme: "auto", // custom attribute
            language: profile.language,
          };
        },
      }),
    ] as Provider[],
    callbacks: {
      async session({ session, user }) {
        // console.log("session:", session, user)
        session.id = user.id;
        if (user.theme) {
          session.theme = user.theme;
        }
        return session;
      },
      async signIn({ account, profile }) {
        if (account && profile) {
          if (account.provider === "google") {
            const p = profile as GoogleProfile;
            return p.email_verified && p.email.endsWith("@gmail.com");
          }
          if (account.provider === "github") {
            return true;
          }
        }
        return false;
      },
    },
  }));

declare module "@auth/core/types" {
  interface Session {
    error?: "RefreshAccessTokenError";
    id?: string;
    theme?: string;
  }
}

declare module "@auth/core/adapters" {
  interface AdapterUser {
    theme?: string;
  }
}
