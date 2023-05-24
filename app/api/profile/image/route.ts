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
      return NextResponse.redirect("/");
    }

    // update profile picture
    const profile = await prisma.profile.update({
      where: {
        userId: currentUser.id
      },
      data: {
        image, // update profile picture
        photos: {
          push: image // add picture to user's photos
        } 
      }
    });

    // return profile
    return NextResponse.json(profile);

  } catch (error: any) {
    // if error, return error
    console.error(error);
  }
}
