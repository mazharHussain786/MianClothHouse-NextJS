import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import dbConnect from "@/lib/mongodb";
import { userModel } from "@/lib/models/user";
import { normalizePhone } from "@/lib/phone";

export const authOptions: AuthOptions = {
  secret: process.env.NEXTAUTH_SECRET || process.env.AUTH_SECRET,
  session: { strategy: "jwt" },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        phone: { label: "Phone", type: "text" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (creds) => {
        if (!creds?.phone || !creds?.password) return null;

        await dbConnect();
        const phone = normalizePhone(creds.phone);
        const user = await userModel.findOne({
          $or: [{ phone }, { username: creds.phone.trim() }],
        });
        if (!user) return null;

        const isMatch = await bcrypt.compare(creds.password, user.password);
        if (!isMatch) return null;

        return {
          id: String(user._id),
          name: user.fullName || user.phone,
          role: user.role,
          phone: user.phone || "",
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role ?? "user";
        token.phone = user.phone ?? "";
      }
      return token;
    },
    async session({ session, token }) {
      session.user.id = token.sub || "";
      session.user.role = token.role || "user";
      session.user.phone = token.phone || "";
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
};
