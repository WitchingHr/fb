import { NextResponse } from "next/server";

import prisma from "@/app/lib/dbConnect";
import getCurrentUser from "@/app/actions/getCurrentUser";

// params
interface IParams {
  id: string;
}

// delete a comment if author is current user
export async function DELETE(req: Request, { params } : { params: IParams }) {
  // get comment id from params
  const { id } = params;

  // get current user
  const user = await getCurrentUser();

  // if no user, redirect to login
  if (!user) {
    return NextResponse.redirect("/");
  }

  // check if comment exists
  const comment = await prisma.comment.findFirst({
    where: {
      id,
      authorId: user.id,
    },
  });

  // if no comment, throw error
  if (!comment) {
    throw new Error("Comment not found");
  }

  // delete comment
  const deletedComment = await prisma.comment.delete({
    where: {
      id,
    },
  });

  // return deleted comment
  return NextResponse.json(deletedComment)
}
