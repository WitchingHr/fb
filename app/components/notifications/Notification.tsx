"use client"

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useContext } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { TiDelete } from "react-icons/ti";

import { Notification } from "@/app/types";
import { UserContext } from "@/app/providers/UserProvider";

// props
interface NotificationProps {
  notification: Notification;
}

// Notification
// displays a single notification
const Notification: React.FC<NotificationProps> = ({
  notification
}) => {
  // router
  const router = useRouter();

  // get current user
  const { user } = useContext(UserContext);

  // delete notification
  const handleDeleteNotification = async () => {
    await axios.delete(`/api/notification/${notification.id}`)
      .then(() => {
        // toast success
        toast.success("Notification cleared");
        // refresh page
        router.refresh();
      })
      .catch(() => {
        // toast error
        toast.error("Error clearing notification");
      });
  };

  // url to sender if friend added, else url to post if like/comment
  const url = notification.content === "friend" ? (
    `/user/${notification.author.id}`
   ) : (
    `/user/${user.id}/${notification.postId}`
  );

  return (
    <li
      className="flex flex-row items-center gap-4 px-2
      border border-neutral-300 dark:border-[#393b3d]
      rounded-md shadow-md"
    >
      {/* notification sender, links to profile */}
      <Link
        href={`/user/${notification.author.id}`}
        className="relative w-10 h-10 overflow-hidden rounded-full"
      >
        <Image
          alt="user image"
          src={notification.author.image || "/images/placeholder.jpg"}
          fill
          className="object-cover duration-300 hover:scale-110"
        />
      </Link>

      {/* notification content */}
      <Link
        href={url} // url to sender if friend added, else url to post if like/comment
        className="flex-1 flex flex-col items-start px-2 py-1 my-1
        text-sm rounded-md duration-300 hover:bg-neutral-100 dark:hover:bg-[#3a3b3c]"
      >
        {/* notification sender */}
        <div>{notification.author.name}</div>

        {/* notification content */}
        <div className="text-left">
          {notification.content === "like" ? (
            "liked your post"
          ) : notification.content === "comment" ? (
            "commented on your post"
          ) : (
            "added you as a friend"
          )}
        </div>

        {/* time */}
        <div className="text-xs text-neutral-500 dark:text-neutral-400">
          {notification.createdAt}
        </div>

      </Link>

      {/* delete notification button */}
      <div onClick={handleDeleteNotification}>
        <TiDelete
          size={32}
          className="text-neutral-500 dark:text-neutral-400" 
        />
      </div>
    </li>
  );
};

export default Notification;
