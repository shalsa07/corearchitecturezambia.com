// Auth.js v5 (NextAuth v5) configuration using MongoDB adapter and Email (magic link)
import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import Email from "next-auth/providers/email";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import clientPromise from "./lib/mongodb";
import { ObjectId } from "mongodb";

const ADMIN_EMAIL = "victorchelemu@gmail.com";

export const {
  handlers,
  auth,
  signIn,
  signOut,
} = NextAuth({
  adapter: MongoDBAdapter(clientPromise),
  session: { strategy: "database" },
  trustHost: true,
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    // Magic Link (passwordless) using SMTP via Nodemailer
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
    // Ensure a role is set on first creation; promote the configured admin email
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
});

