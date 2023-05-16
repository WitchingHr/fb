import { PrismaAdapter } from "@next-auth/prisma-adapter";
import NextAuth, { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";

import prisma from "@/app/lib/dbConnect";

export const authOptions: AuthOptions = {
  // use prisma
  adapter: PrismaAdapter(prisma),

  // sign in methods
  providers: [
    // with email and password
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "email", type: "text" },
        password: { label: "password", type: "password" },
      },
      // authorize function
      async authorize(credentials) {
        // check if credentials are present
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Missing credentials");
        }

        // find user in db by email
        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        // if user not found, throw error
        if (!user) {
          throw new Error("User not found");
        }

        // check if password is correct
        const isCorrectPassword = await bcrypt.compare(
          // entered password
          credentials.password,
          // db password
          user.hashedPassword
        );

        // if password is incorrect, throw error
        if (!isCorrectPassword) {
          throw new Error("Invalid password");
        }

        // otherwise, return user
        return user;
      },
    }),
  ],
  pages: {
    // redirect to home page after sign in
    signIn: "/home",
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST }
