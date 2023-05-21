"use client"

import { User } from "@/app/types";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { BsPersonPlusFill } from "react-icons/bs";

interface SuggestedFriendsProps {
  suggestedFriends: User[];
}

const SuggestedFriends: React.FC<SuggestedFriendsProps> = ({
  suggestedFriends
}) => {
  // router
  const router = useRouter();

  // state for sending request
  const [isSending, setIsSending] = useState<boolean>(false);

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
  return (
    <div className="flex flex-col w-full gap-2 bg-white dark:bg-[#242526] border dark:border-0 rounded-md shadow-sm border-neutral-300">
      <h1 className="px-4 pt-4 text-xl font-medium text-black dark:text-[#e4e6eb]">Suggested Friends</h1>

      <div className="suggested-grid">
        {suggestedFriends.map((user) => (
          <div
            key={user.id}
            className={`flex flex-col border overflow-hidden
            rounded-md shadow-lg border-neutral-300 dark:border-[#3a3b3c]`}
          >
            <Link href={`/user/${user.id}`} className="relative w-full overflow-hidden aspect-square">
      
              {/* user image */}
              <Image
                src={user.image || "/images/placeholder.jpg"}
                alt="user photo"
                className="object-cover duration-300 hover:scale-110"
                fill
              />
            </Link>
            <div className="flex flex-col justify-between flex-1 gap-1 p-3 pt-1">
              {/* name */}
              <div className="text-black dark:text-[#e4e6eb]">{user.name}</div>
      
              {/* add friend button */}
              <button
                onClick={() => handleAddFriend(user.id)}
                disabled={isSending}
                className={`flex gap-2 duration-300 py-1 px-2 rounded-md
                whitespace-nowrap items-center justify-center mt-auto
                text-[#1b74e4] dark:text-[#2d86ff] bg-[#e7f3ff] dark:bg-[#263951]
                hover:bg-[#d1dce7] dark:hover:bg-[#2f4764]`}
              >
                <BsPersonPlusFill size={20} />
                <div>Add Friend</div>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SuggestedFriends;
