import { NextResponse } from "next/server";

import prisma from "@/app/lib/dbConnect";
import getCurrentUser from "@/app/actions/getCurrentUser";

// params
interface IParams {
  id: string;
}

// delete comment by id
export async function DELETE(req: Request, { params } : { params: IParams }) {
  try {
    // get comment id from params
    const { id } = params;

    // get current user
    const user = await getCurrentUser();

    // if no user, redirect to login
    if (!user) {
      alert("Session expired. Please log in again.");
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

    if (!deletedComment) {
      throw new Error("Comment not found");
    }

    // return deleted comment
    return NextResponse.json(deletedComment)

  } catch (error: any) {
    // if error
    console.error(error);
  }
}
