import { NextResponse } from "next/server";
import prisma from "@/app/lib/dbConnect";
import getCurrentUser from "@/app/actions/getCurrentUser";

// params
interface IParams {
  id: string;
}

// delete notification
export async function DELETE(request: Request, { params } : {params: IParams}) {
  try {
    // get current user
    const user = await getCurrentUser();

    // if user not logged in, redirect to home page
    if (!user) {
      return NextResponse.redirect("/");
    }

    // get postId
    const { id } = params;

    // delete notification
    const notification = await prisma.notification.delete({
      where: {
        id: id,
      },
    });

    // return deleted post
    return NextResponse.json(notification);

  } catch (error) {
    // if error
    console.log(error);
    return NextResponse.error();
  }
}

