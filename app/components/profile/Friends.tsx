"use client"

import { User } from "@/app/types";
import Image from "next/image";
import Link from "next/link";

// props
interface FriendsProps {
  friends: User[];
  seeAll: () => void;
}

// Friends
// friends grid, shows up to 9 friends
const Friends: React.FC<FriendsProps> = ({
  friends,
  seeAll
}) => {
  return (
    <div className="flex flex-col gap-2 p-4 bg-white dark:bg-[#242526] border dark:border-0 rounded-md shadow-sm border-neutral-300">

      <div className="flex justify-between">
        {/* heading */}
        <h1 className="text-2xl font-semibold text-black dark:text-[#e4e6eb]">Friends</h1>

        {/* see all friends button */}
        <button
          onClick={seeAll}
          className="text-[#1b74e4] hover:bg-[#e7f3ff] dark:hover:bg-[#3a3b3c] px-3 py-1 rounded-md duration-300"
        >
          See all friends
        </button>
      </div>

      {/* friend count */}
      <div className="font-light text-neutral-500 dark:text-neutral-400">
        {friends.length} friend{friends.length === 1 ? "" : "s"}
      </div>
      
      {/* grid */}
      <div className="grid grid-cols-3 grid-rows-1 gap-4 auto-rows-[0px] lg:auto-rows-min grid-auto-rows">
        {friends.map((friend) => (
          <Link href={`/user/${friend.id}`} key={friend.id}
            className="flex flex-col gap-1 ">

            {/* friend avatar */}
            <div className="relative w-full overflow-hidden rounded-md aspect-square">
              <Image src={friend.image || "/images/placeholder.jpg"} fill
                alt="friend profile picture" className="object-cover duration-300 hover:scale-110" />
            </div>

            {/* friend name */}
            <div className="text-sm text-black dark:text-[#e4e6eb] truncate">{friend.name}</div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Friends;
