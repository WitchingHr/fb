import { NextResponse } from "next/server";
import prisma from "@/app/lib/dbConnect";

// create a new comment on a post
export async function POST(req: Request) {
  try {
    // get data from request
    const { content, postId, author } = await req.json();

    // if no author, user is not logged in, redirect to login
    if (!author) {
      return NextResponse.redirect("/");
    }

    // Create a new comment
    const comment = await prisma.comment.create({
      data: {
        content,
        postId,
        authorId: author,
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
