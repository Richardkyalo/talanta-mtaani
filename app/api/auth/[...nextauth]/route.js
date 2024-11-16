import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import axios from "axios";

const api = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_URL}`,
});

const authUrl = "/api/v1/user/login";

// NextAuth options
const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          const { data } = await api.post(authUrl, {
            email: credentials.email,
            password: credentials.password,
          });

          if (data && data.data && data.data.authToken) {
            return {
              id: data.data.user.id,
              email: data.data.user.email,
              token: data.data.authToken,
            };
          }
          return null;
        } catch (error) {
          console.error("Login error:", error);
          return null;
        }
      },
    }),
  ],
  pages: {
    signIn: "/Login", // Custom sign-in page (optional)
  },
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.token = user.token;
      }
      return token;
    },
    async session({ session, token }) {
      session.id = token.id;
      session.email = token.email;
      session.token = token.token;
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};

// Default export for route.js (Handler)
const handler = (req, res) => NextAuth(req, res, authOptions);
export { handler as GET, handler as POST };
