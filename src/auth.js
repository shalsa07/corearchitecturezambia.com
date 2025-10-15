// Auth.js v5-style API, implemented compatibly for NextAuth v4 runtime
// - Exports `handlers` with GET/POST for App Router route
// - Exports `auth()` shim using v4 getServerSession so server components can call `await auth()`
import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import Email from "next-auth/providers/email";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import clientPromise from "./lib/mongodb";
import { ObjectId } from "mongodb";
import { getServerSession } from "next-auth/next";

const ADMIN_EMAIL = "victorchelemu@gmail.com";

export const authOptions = {
  adapter: MongoDBAdapter(clientPromise),
  session: { strategy: "database" },
  secret: process.env.NEXTAUTH_SECRET,
  trustHost: true,
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    Email({
      server: {
        host: process.env.EMAIL_SERVER_HOST,
        port: Number(process.env.EMAIL_SERVER_PORT || 587),
        auth: {
          user: process.env.EMAIL_SERVER_USER,
          pass: process.env.EMAIL_SERVER_PASSWORD,
        },
      },
      from: process.env.EMAIL_FROM,
    }),
  ],
  callbacks: {
    async session({ session, user }) {
      if (user) {
        session.user = {
          id: user.id,
          name: user.name,
          email: user.email,
          image: user.image,
          role: user.role || "user",
        };
      }
      return session;
    },
  },
  events: {
    async createUser({ user }) {
      try {
        const client = await clientPromise;
        const db = client.db(process.env.MONGODB_DB);
        const users = db.collection("users");
        const desiredRole = (user.email || "").toLowerCase() === ADMIN_EMAIL ? "admin" : "user";
        await users.updateOne(
          { _id: new ObjectId(user.id) },
          { $set: { role: desiredRole } }
        );
      } catch (e) {
        console.error("[auth events.createUser]", e);
      }
    },
    async signIn({ user }) {
      try {
        const client = await clientPromise;
        const db = client.db(process.env.MONGODB_DB);
        const users = db.collection("users");
        await users.updateOne(
          { _id: new ObjectId(user.id) },
          { $set: { lastLogin: new Date() } }
        );
      } catch (e) {
        console.error("[auth events.signIn]", e);
      }
    },
  },
};

// App Router route handlers (v4-compatible)
const handler = NextAuth(authOptions);
export const handlers = { GET: handler, POST: handler };

// v5-like auth() helper shim for Server Components / APIs
export async function auth(...args) {
  if (args.length === 0) return getServerSession(authOptions);
  if (args.length === 1) return getServerSession(args[0]);
  return getServerSession(args[0], args[1], authOptions);
}
