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
      image,
    } = body;

    // get current user
    const currentUser = await getCurrentUser();

    // if no current user, throw error
    if (!currentUser) {
      throw new Error("User not found");
    }

    // update profile picture
    const profile = await prisma.profile.update({
      where: {
        userId: currentUser.id
      },
      data: {
        image,
        photos: {
          push: image
        } 
      }
    });

    // return profile
    return NextResponse.json(profile);

  } catch (error) {
    console.log(error);
    // if error, return error
    return NextResponse.error();
  }
}


