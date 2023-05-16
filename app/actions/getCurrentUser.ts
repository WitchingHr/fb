import { getServerSession } from "next-auth/next";

import { authOptions } from "../api/auth/[...nextauth]/route";
import prisma from "@/app/lib/dbConnect";

// get session from server
export async function getSession() {
  return await getServerSession(authOptions);
}

// get current user from session
export default async function getCurrentUser() {
  try {
    // get session
    const session = await getSession();

    if (!session?.user?.email) {
      return null;
    }

    // get user from db
    const currentUser = await prisma.user.findUnique({
      where: {
        email: session.user.email as string,
      },
    });

    // if user not found, return null
    if (!currentUser) {
      return null;
    }

    // return user
    return currentUser;

  } catch (error) {
    // if error, return null
    console.error(error);
    return null;
  }
}