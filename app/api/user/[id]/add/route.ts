import { NextResponse } from "next/server";

import prisma from '@/app/lib/dbConnect';
import getCurrentUser from "@/app/actions/getCurrentUser";

interface IParams {
  id: string;
}

// add friend
export async function POST(req: Request, { params }: { params: IParams }) {
  try {
    // get current user
    const user = await getCurrentUser();

    // if user is not logged in, redirect to login page
    if (!user) {
      return NextResponse.redirect("/");
    }

    // get user id from params
    const { id } = params;

    // check if user is already a friend
    const friends = await prisma.user.findUnique({
      where: {
        id: user.id,
      },
      select: {
        friends: true,
      },
    });

    if (!friends) {
      return NextResponse.error();
    }

    // if user is already a friend, redirect to user page
    if (friends.friends.some((friend) => friend.id === id)) {
      return NextResponse.error();
    }

    // add friend to user
    const friend = await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        friends: {
          connect: {
            id,
          },
        },
      },
    });

    // add user to friend
    const friend2 = await prisma.user.update({
      where: {
        id,
      },
      data: {
        friends: {
          connect: {
            id: user.id,
          },
        },
      },
    });

    // send notification to friend
    await prisma.notification.create({
      data: {
        content: 'friend',
        recipientId: id,
        authorId: user.id,
      },
    });

    // return friend request
    return NextResponse.json(friend);

  } catch (error) {
    console.error(error);
    return NextResponse.error();
  }
}
