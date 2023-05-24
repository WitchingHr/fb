import { DateTime } from "luxon";

import prisma from "@/app/lib/dbConnect";
import getCurrentUser from "./getCurrentUser";

// get user notifications
export default async function getNotifications() {
  try {
    // get current user
    const user = await getCurrentUser();

    // if no user, return null
    if (!user) {
      return null;
    }

    // get notifications, newest first
    const notifications = await prisma.notification.findMany({
      where: {
        recipientId: user.id,
      },
      orderBy: {
        createdAt: "desc",
      },
      select: {
        id: true,
        content: true, // like, comment, or friend
        createdAt: true,
        postId: true, // post id if content is like or comment
        author: { // notification sender
          select: {
            id: true,
            name: true,
            profile: {
              select: {
                image: true,
              },
            },
          },
        },
      },
    });

    // if no notifications, return null
    if (!notifications) {
      return null;
    }

    // sanitize notifications
    const safeNotifications = notifications.map((notification) => {
      const { createdAt, author, ...otherProps } = notification;

      return {
        ...otherProps,
        // restructure notification sender
        author: {
          id: author.id,
          name: author.name,
          image: author.profile?.image || null,
        },
        // convert date to string
        createdAt: DateTime.fromJSDate(notification.createdAt).toLocaleString(DateTime.DATETIME_MED),
      }
    });

    // return sanitized notifications to client
    return safeNotifications;

  } catch (error) {
    // if error, log and return null
    console.log(error);
    return null;
  }
}
