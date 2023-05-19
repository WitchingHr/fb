import { NextResponse } from "next/server";

import prisma from "@/app/lib/dbConnect";
import getCurrentUser from "@/app/actions/getCurrentUser";

export async function POST(req: Request) {
  try {
    // get current user
    const user = await getCurrentUser();

    // if user is not logged in, redirect to home page
    if (!user) {
      return NextResponse.redirect("/");
    }

    // get post id from request body
    const { postId } = await req.json();

    // check if post exists
    const post = await prisma.post.findUnique({
      where: {
        id: postId,
      },
    });

    // if post does not exist
    if (!post) {
      return NextResponse.error();
    }

    // check if user has already liked the post
    const like = await prisma.like.findFirst({
      where: {
        postId,
        authorId: user.id
      },
    });

    // if user has already liked the post, delete the like
    if (like) {
      await prisma.like.delete({
        where: {
          id: like.id,
        },
      });

      return NextResponse.json({ status: 204 });
    }

    // if user has not liked the post, create a new like
    if (!like) {
      await prisma.like.create({
        data: {
          postId,
          authorId: user.id,
        },
      });
      return NextResponse.json({ status: 201 });
    }

  } catch (error) {
    // if error
    console.log(error);
    return NextResponse.error();
  }
}