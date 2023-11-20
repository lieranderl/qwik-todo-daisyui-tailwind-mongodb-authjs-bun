import { serverAuth$ } from "@builder.io/qwik-auth";
import GitHub from "@auth/core/providers/github";
import Facebook from "@auth/core/providers/facebook";
import type { Provider } from "@auth/core/providers";
import mongoClientPromise from "../utils/mongodbinit";
import type { GoogleProfile } from "@auth/core/providers/google";
import Google from "@auth/core/providers/google";
import { MongoDBAdapter } from "@auth/mongodb-adapter";


export const { onRequest, useAuthSession, useAuthSignin, useAuthSignout } =
  serverAuth$(({ env }) => ({
    session: {
      strategy: "database",
      maxAge: 60 * 60 * 24 * 7, // 1 week
      updateAge: 60 * 60 * 24, // 1 day
    },
    adapter: MongoDBAdapter(mongoClientPromise, { databaseName: "testing" }),
    secret: env.get("AUTH_SECRET"),
    trustHost: true,
    providers: [
      Google({
        clientId: env.get("GOOGLE_ID")!,
        clientSecret: env.get("GOOGLE_SECRET")!,
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
      }
      ),
      GitHub({
        clientId: env.get("GITHUB_OAUTH_CLIENT_ID")!,
        clientSecret: env.get("GITHUB_OAUTH_CLIENT_SECRET")!,
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
        }
      }),
      Facebook({
        clientId: env.get("FACEBOOK_OAUTH_CLIENT_ID")!,
        clientSecret: env.get("FACEBOOK_OAUTH_CLIENT_SECRET")!,
        profile(profile) {
          return {
            id: profile.id.toString(),
            theme: "auto", // custom attribute
            language: profile.language,
          };
        }
      })
    ] as Provider[],
    callbacks: {
      async session({ session, user }) {
        // console.log("session:", session, user)
        session.id = user.id
        if (user.theme) {
          session.theme = user.theme
        }
        return session
      },
      async signIn({ account, profile }) {
        if (account && profile) {
          if (account.provider === "google") {
            const p = profile as GoogleProfile;
            return p.email_verified && p.email.endsWith("@gmail.com")
          }
          if (account.provider === "github") {
            return true
          }
        }
        return false
      },
    },
  }));


declare module "@auth/core/types" {
  interface Session {
    error?: "RefreshAccessTokenError"
    id?: string
    theme?: string
  }
}

declare module "@auth/core/adapters" {
  interface AdapterUser {
    theme?: string
  }
}