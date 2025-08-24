import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import dbConnect from "@/lib/mongodb";
import { userModel } from "@/lib/models/user";

export const authOptions: AuthOptions = {
  session: { strategy: "jwt" },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (creds) => {
        if (!creds?.username || !creds?.password) return null;

        await dbConnect();
        const user = await userModel.findOne({ username: creds.username });
        if (!user) return null;

        const isMatch = await bcrypt.compare(creds.password, user.password);
        if (!isMatch) return null;

        return { id: String(user._id), name: user.username, role: user.role };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) token.role = (user as any).role ?? "user";
      return token;
    },
    async session({ session, token }) {
      (session.user as any).id = token.sub;
      (session.user as any).role = token.role;
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
};