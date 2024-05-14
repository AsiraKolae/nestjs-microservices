import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { cookies } from 'next/headers'

export const options: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const res = await fetch(`${process.env.API_URL}/login`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: credentials?.email,
            password: credentials?.password,
            client: 1,
          }),
        });

        const user = await res.json();

        if (user.status.code === 200) {
          return user;
        } else if (user.status.code === 422) {
          return Promise.reject({
            message: "อีเมล หรือ รหัสผ่าน ไม่ถูกต้อง",
          });
        } else {
          return null;
        }
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async jwt({ token, user, trigger, session }) {
      if (trigger === "update") {
        token.user = session.user;
      }
      if (user) {
        token.accessToken = user.data.token;
        token.user = user.data.user;
      }
      return token;
    },
    async session({ session, token }) {
    
      session.user = token.user as any;
      return session;
    },
  },
};
