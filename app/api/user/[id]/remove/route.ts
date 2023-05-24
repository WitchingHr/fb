import { NextResponse } from 'next/server';

import prisma from '@/app/lib/dbConnect';
import getCurrentUser from "@/app/actions/getCurrentUser";

// params
interface IParams {
  id: string;
}

// remove friend by id
export async function POST(req: Request, { params }: { params: IParams }) {
  try {
    // get current user
    const currentUser = await getCurrentUser();

    // if user is not logged in, redirect to login page
    if (!currentUser) {
      return NextResponse.redirect("/");
    }

    // get user id from params
    const { id } = params;

    // check if user is a friend
    const friends = await prisma.user.findUnique({
      where: {
        id: currentUser.id,
      },
      select: {
        friends: true,
      },
    });

    // if user not found, throw error
    if (!friends) {
      throw new Error("User not found");
    }

    // if users are already not friends, redirect to user page
    if (!friends.friends.some((friend) => friend.id === id)) {
      return NextResponse.redirect(`/user/${id}`);
    }

    // remove friend from current user
    const friendship = await prisma.user.update({
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

    // if error removing friend, throw error
    if (!friendship) {
      throw new Error("Error removing friend");
    }

    // remove currnet user from friend
    const friendship2 = await prisma.user.update({
      where: {
        id, // friend id
      },
      data: {
        friends: {
          disconnect: {
            id: currentUser.id, // disconnect from current user
          },
        },
      },
    });

    // if error removing friend
    if (!friendship2) {
      // undo previous update
      await prisma.user.update({
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

      // throw error
      throw new Error("Error removing friend");
    }

    // return friend request
    return NextResponse.json(friendship);

  } catch (error: any) {
    console.error(error);
  }
}
