import { NextResponse } from "next/server";

import prisma from "@/app/lib/dbConnect";
import getCurrentUser from "@/app/actions/getCurrentUser";

// create new profile
export async function POST(request: Request) {
  try {
    // get body from request
    const body = await request.json();

    // destructure body
    const {
      cover,
    } = body;

    // get current user
    const currentUser = await getCurrentUser();

    // if no current user, throw error
    if (!currentUser) {
      throw new Error("User not found");
    }

    // update profile
    const profile = await prisma.profile.update({
      where: {
        userId: currentUser.id
      },
      data: {
        cover: cover,
      }
    });

    console.log(profile)

    // return profile
    return NextResponse.json(profile);

  } catch (error) {
    console.log(error);
    // if error, return error
    return NextResponse.error();
  }
}

