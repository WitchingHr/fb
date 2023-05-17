"use client"

import Image from "next/image";

// props
interface FriendsProps {
  friends: string[];
}

// Friends
// friends grid, shows 9 friends
const Friends: React.FC<FriendsProps> = ({
  friends
}) => {
  return (
    <div className="flex flex-col gap-2 p-4 bg-white rounded-md shadow-sm">
      <h1 className="text-2xl font-semibold">Friends</h1>
      <div className="font-light text-neutral-500">friends</div>

      <div className="grid grid-cols-3 grid-rows-3">
        {friends.map((friend) => (
          <div key={friend.id} className="flex flex-col gap-1">
            <div className="relative w-full aspect-square">
              <Image src={friend.image} fill alt="friend profile picture" className="rounded-md" />
            </div>
            <div className="text-sm font-semibold">{friend.name}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Friends;
