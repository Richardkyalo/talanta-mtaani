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
        username: { label: "username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          const { data } = await api.post(authUrl, {
            username: credentials.username,
            password: credentials.password,
          });

          if (data && data.data && data.data.authToken) {
            const permissionsData = data.data.user.permissions?.data || {};
            const roleIds = Object.keys(permissionsData);
        
            return {
                id: data.data.user.id,
                username: data.data.user.username,
                email: data.data.user.email,
                role_ids: roleIds, // Array of all role_ids
                refreshToken: data.data.refreshToken,
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
        token.username = user.username;
        token.role_ids = user.role_ids;
        token.email = user.email;
        token.refreshToken = user.refreshToken;
        token.token = user.token;
      }
      return token;
    },
    async session({ session, token }) {
      session.id = token.id;
      session.username = token.username;
      session.email = token.email;
      session.role_ids = token.role_ids;
      session.refreshToken = token.refreshToken;
      session.token = token.token;
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};

// Default export for route.js (Handler)
const handler = (req, res) => NextAuth(req, res, authOptions);
export { handler as GET, handler as POST };
