import { NextResponse } from "next/server";
import { NextApiResponse } from "next";

import prisma from "@/app/lib/dbConnect";
import getCurrentUser from "@/app/actions/getCurrentUser";

// like post
export async function POST(req: Request, res: NextApiResponse) {
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
      throw new Error("Post not found");
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
      const deleted = await prisma.like.delete({
        where: {
          id: like.id,
        },
      });

      // if error deleting like
      if (!deleted) {
        throw new Error("Error unliking post");
      }

      // return 204 No Content
      return res.status(204);

    } else {
    // if user has not liked the post, create a new like
      const liked = await prisma.like.create({
        data: {
          postId,
          authorId: user.id,
        },
      });

      // if error creating like
      if (!liked) {
        throw new Error("Error liking post");
      }

      // check if post author is the same as the current user
      if (post.authorId === user.id) {
        return res.status(201);
      }

      // otherwise, send notification to post author
      await prisma.notification.create({
        data: {
          content: "like",
          recipientId: post.authorId,
          authorId: user.id,
          postId: post.id,
        },
      });

      // return 201 Created
      return res.status(201);
    }
  } catch (error: any) {
    // if error
    console.error(error);
  }
}
