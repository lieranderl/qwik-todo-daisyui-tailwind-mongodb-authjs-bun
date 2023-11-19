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
        profile(profile: GoogleProfile  ) {
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
        session.id = user.id
        if (user.theme) {
          session.theme = user.theme
        }
        return session
      },
      // async session({ session, user }) {
      //   const mongodb = await mongoClientPromise;
      //   const accounts = mongodb.db("testing").collection("accounts");
      //   const userId = new ObjectId(user.id);
      //   const cursor = accounts.find({ userId: userId, provider: "google" })
      //   console.log("cursor")
      //   for await (const google of cursor) {
      //     console.log("cursor!!!!!")
      //     if (google.expires_at * 1000 < Date.now()) {
      //       // If the access token has expired, try to refresh it
      //       try {
      //         // https://accounts.google.com/.well-known/openid-configuration
      //         // We need the `token_endpoint`.
      //         console.log("response", process.env.GOOGLE_ID!)
      //         const response = await fetch("https://oauth2.googleapis.com/token", {
      //           headers: { "Content-Type": "application/x-www-form-urlencoded" },
      //           body: new URLSearchParams({
      //             client_id: process.env.GOOGLE_ID!,
      //             client_secret: process.env.GOOGLE_SECRET!,
      //             grant_type: "refresh_token",
      //             refresh_token: google.refresh_token,
      //           }),
      //           method: "POST",
      //         })
      //         console.log("response", response)
      //         const tokens: TokenSet = await response.json()

      //         if (!response.ok) throw tokens

      //         await accounts.updateOne(
      //           {
      //             _id: google._id,
      //           },
      //           {
      //             access_token: tokens.access_token,
      //             expires_at: Math.floor(Date.now() / 1000 + tokens.expires_in!),
      //             refresh_token: tokens.refresh_token ?? google.refresh_token,
      //           },

      //         )
      //       } catch (error) {
      //         console.error("Error refreshing access token", error)
      //         // The error property will be used client-side to handle the refresh token error
      //         session.error = "RefreshAccessTokenError"
      //       }
      //     }
      //   }
      //   return session
      // },
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

