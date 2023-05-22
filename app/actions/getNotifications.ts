import prisma from "@/app/lib/dbConnect";
import getCurrentUser from "./getCurrentUser";
import { DateTime } from "luxon";

// get notifications
export default async function getNotifications() {
  try {
    const user = await getCurrentUser();

    if (!user) {
      return null;
    }

    const notifications = await prisma.notification.findMany({
      where: {
        recipientId: user.id,
      },
      orderBy: {
        createdAt: "desc",
      },
      select: {
        id: true,
        content: true,
        createdAt: true,
        postId: true,
        author: {
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

    if (!notifications) {
      return null;
    }

    const safeNotifications = notifications.map((notification) => {
      const { createdAt, author, ...rest } = notification;

      return {
        ...rest,
        author: {
          id: author.id,
          name: author.name,
          image: author.profile?.image || null,
        },
        createdAt: DateTime.fromJSDate(notification.createdAt).toLocaleString(DateTime.DATETIME_MED),
      }
    });

    return safeNotifications;

  } catch (error) {
    console.log(error);
    return null;
  }
}
