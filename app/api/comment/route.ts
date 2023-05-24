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

    // get data from request body
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
      throw new Error("Error creating comment");
    }

    // get post author id
    const post = await prisma.post.findUnique({
      where: {
        id: postId,
      },
      select: {
        authorId: true,
      },
    });

    if (!post) {
      throw new Error("Post not found");
    }

    // check if post author is the same as the current user
    if (post.authorId === user.id) {
      return NextResponse.json(comment);
    }

    // otherwise, send notification to post author
    await prisma.notification.create({
      data: {
        content: 'comment',
        recipientId: post.authorId,
        postId,
        authorId: user.id,
      },
    });

    // return the comment
    return NextResponse.json(comment);

  } catch (error: any) {
    // if error
    console.error(error);
  }
}
