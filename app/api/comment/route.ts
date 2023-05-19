import { NextResponse } from "next/server";

import prisma from "@/app/lib/dbConnect";
import getCurrentUser from "@/app/actions/getCurrentUser";

// create a new comment on a post
export async function POST(req: Request) {
  try {
    // get current user
    const user = await getCurrentUser();

    // if user is not logged in, redirect to home page
    if (!user) {
      return NextResponse.redirect("/");
    }

    // get data from request
    const { content, postId } = await req.json();

    // Create a new comment
    const comment = await prisma.comment.create({
      data: {
        content,
        postId,
        authorId: user.id,
      },
    });

    // if error creating comment
    if (!comment) {
      return NextResponse.error();
    }

    // return the comment
    return NextResponse.json(comment);

  } catch (error) {
    // return error
    return NextResponse.error();
  }
}
