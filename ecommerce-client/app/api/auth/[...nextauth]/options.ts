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
        const query = `
          query {
            userEmail(email: "${credentials.email}") {
              id
              email
              password
            }
          }
        `;
        
        const requestBody = {
          query: query,
          variables: {}
        };
  
        const res = await fetch(`http://localhost:3001/graphql`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(requestBody)
        });
  
        const user = await res.json();
        console.log(user);
        
        if (user.data.userEmail.email !== null) {
          return user;
        }else {
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
