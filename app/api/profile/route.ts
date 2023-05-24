import { NextResponse } from "next/server";

import prisma from "@/app/lib/dbConnect";

// create new profile
export async function POST(req: Request) {
  try {
    // get body from request
    const body = await req.json();

    // destructure body
    const {
      userId,
      location,
      job,
      education,
      bio,
      image
    } = body;

    // find user, include profile
    const user = await prisma.user.findUnique({
      where: {
        id: userId
      },
      include: {
        profile: true
      }
    });

    // if user not found, throw error
    if (!user) {
      throw new Error("User not found");
    }

    // if user already has profile, throw error
    if (user.profile) {
      throw new Error("Profile already exists");
    }

    // create new profile
    const profile = await prisma.profile.create({
      data: {
        userId,
        location,
        job,
        education,
        bio,
        image, // add profile picture to profile
        photos: [image] // add profile picture to user's photos
      }
    });

    // return profile
    return NextResponse.json(profile);

  } catch (error: any) {
    // if error, return error
    console.error(error);
  }
}
