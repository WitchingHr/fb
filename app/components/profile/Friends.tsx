"use client"

import { User } from "@/app/types";
import Image from "next/image";
import Link from "next/link";
import Avatar from "../Avatar";

// props
interface FriendsProps {
  friends: User[];
}

// Friends
// friends grid, shows 9 friends
const Friends: React.FC<FriendsProps> = ({
  friends
}) => {
  return (
    <div className="flex flex-col gap-2 p-4 bg-white border rounded-md shadow-sm border-neutral-300">
      {/* heading */}
      <h1 className="text-2xl font-semibold">Friends</h1>

      {/* friend count */}
      <div className="font-light text-neutral-500">
        {friends.length} friend{friends.length === 1 ? "" : "s"}
      </div>
      
      {/* grid */}
      <div className="grid grid-cols-3 gap-4 grid-auto-rows">
        {friends.map((friend) => (
          <Link href={`/user/${friend.id}`} key={friend.id}
            className="flex flex-col gap-1 max-w-[149px]">
            <div className="relative w-full aspect-square">
              <Image src={friend.image || "/images/placeholder.jpg"} fill
                alt="friend profile picture" className="object-cover rounded-md" />
            </div>
            <div className="text-sm">{friend.name}</div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Friends;
