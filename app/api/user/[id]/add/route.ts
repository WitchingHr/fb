import { NextResponse } from "next/server";

import prisma from '@/app/lib/dbConnect';
import getCurrentUser from "@/app/actions/getCurrentUser";

// params
interface IParams {
  id: string;
}

// add friend by id
export async function POST(req: Request, { params } : { params: IParams }) {
  try {
    // get current user
    const currentUser = await getCurrentUser();

    // if user is not logged in, redirect to login page
    if (!currentUser) {
      return NextResponse.redirect("/");
    }

    // get id from params
    const { id } = params;

    // check if user is already a friend
    const friends = await prisma.user.findUnique({
      where: {
        id: currentUser.id,
      },
      select: {
        friends: true,
      },
    });

    if (!friends) {
      throw new Error("User not found");
    }

    // if user is already a friend, redirect to user page
    if (friends.friends.some((friend) => friend.id === id)) {
      return NextResponse.redirect(`/user/${id}`);
    }

    // add friend to current user
    const friendship = await prisma.user.update({
      where: {
        id: currentUser.id, // current user id
      },
      data: {
        friends: {
          connect: {
            id, // connect to friend
          },
        },
      },
    });

    if (!friendship) {
      throw new Error("Error adding friend");
    }

    // add current user to friend
    const friendship2 = await prisma.user.update({
      where: {
        id, // friend id
      },
      data: {
        friends: {
          connect: {
            id: currentUser.id, // connect to current user
          },
        },
      },
    });

    if (!friendship2) {
      // undo adding friend to current user
      await prisma.user.update({
        where: {
          id: currentUser.id, // current user id
        },
        data: {
          friends: {
            disconnect: {
              id, // disconnect from friend
            },
          },
        },
      });

      // throw error
      throw new Error("Error adding friend");
    }

    // send notification to friend
    await prisma.notification.create({
      data: {
        content: 'friend',
        recipientId: id,
        authorId: currentUser.id,
      },
    });

    // return friend request
    return NextResponse.json(friendship);

  } catch (error: any) {
    // if error, return error
    console.error(error);
  }
}
