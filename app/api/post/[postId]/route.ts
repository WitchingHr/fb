import { NextResponse } from "next/server";
import prisma from "@/app/lib/dbConnect";
import getCurrentUser from "@/app/actions/getCurrentUser";

// params
interface IParams {
  postId: string;
}

// delete post
export async function DELETE(request: Request, { params } : {params: IParams}) {
  try {
    // get current user
    const user = await getCurrentUser();

    // if user not logged in, redirect to home page
    if (!user) {
      return NextResponse.redirect("/");
    }

    // get postId
    const { postId } = params;

    // check if post exists and belongs to current user
    const post = await prisma.post.findFirst({
      where: {
        id: postId,
        authorId: user.id,
      },
    });

    if (!post) {
      return NextResponse.error();
    }

    // delete post
    await prisma.post.delete({
      where: {
        id: postId,
      },
    });

    // return deleted post
    return NextResponse.json(post);

  } catch (error) {
    // if error
    return NextResponse.error();
  }
}
