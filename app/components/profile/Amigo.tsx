"use client"

import { SafeUser, User } from "@/app/types";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { BsPersonCheckFill, BsPersonDashFill, BsPersonPlusFill } from "react-icons/bs";

interface AmigoProps {
  friend: User;
  user: SafeUser;
}

const Amigo: React.FC<AmigoProps> = ({
  friend,
  user
}) => {
  // router
  const router = useRouter();

  // sending request state for disabling buttons
  const [isSending, setIsSending] = useState<boolean>(false);

  // remove friend button hover state
  const [hover, setHover] = useState<string>("Friends");

  // change remove friend button text on hover
  const handleRemoveFriendButton = () => {
    if (hover === "Friends") {
      return setHover("Remove");
    }
    setHover("Friends");
  }

  // add friend
  const handleAddFriend = async (id: string) => {
    setIsSending(true);

    // send request
    await axios.post(`/api/user/${id}/add`)
      .then(() => {
        // toast success
        toast.success("Friend added!");
        // refresh page
        router.refresh();
      })
      .catch((err) => {
        // toast error
        toast.error(err.response.data.message);
      })
      .finally(() => {
        setIsSending(false);
      });
  };

  // remove friend
  const handleRemoveFriend = async (id: string) => {
    setIsSending(true);

    // send request
    await axios.post(`/api/user/${id}/remove`)
      .then(() => {
        // toast success
        toast.success("Friend removed");
        // refresh page
        router.refresh();
      })
      .catch((err) => {
        // toast error
        toast.error(err.response.data.message);
      })
      .finally(() => {
        setIsSending(false);
      });
  }

  return (
    <div
      className="flex flex-row gap-2 xs:gap-4 items-center border border-neutral-300 dark:border-[#393b3d] p-2 xs:p-4 rounded-md"
    >
      
      {/* image */}
      <Link
        href={`/user/${friend.id}`}
        className="relative w-[36px] xs:w-[48px] sm:w-[80px] shrink-0 aspect-square"
      >
        <Image src={friend.image || "/images/placeholder.jpg"} fill
          alt="friend profile picture" className="object-cover rounded-md"
        />
      </Link>

      {/* friend name */}
      <Link
        href={`/user/${friend.id}`}
        className="text-sm text-black dark:text-[#e4e6eb] min-w-[60px] shrink whitespace-normal truncate hover:underline"
      >
        {friend.name}
      </Link>

      {friend.id !== user.id && (
        <div className="ml-auto">
          {user.friendsIds.includes(friend.id) ? (
            <button
              disabled={isSending}
              onClick={() => handleRemoveFriend(friend.id)}
              onMouseEnter={handleRemoveFriendButton}
              onMouseLeave={handleRemoveFriendButton}
              className="p-1 duration-300 rounded-full text-neutral-500 
              dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-[#3a3b3c]"
            >
              {hover === "Friends" ? (
                <BsPersonCheckFill size={20} className="text-[#35a420]" />
              ) : (
                <BsPersonDashFill size={20} className="text-[#f02849]" />
              )}
            </button>
          ) : (
            <button
              disabled={isSending}
              onClick={() => handleAddFriend(friend.id)}
              className="p-1 duration-300 rounded-full text-neutral-500
              dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-[#3a3b3c]"
            >
              <BsPersonPlusFill size={20} />
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default Amigo;
