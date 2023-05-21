"use client"

import { SafeUser, UserProfile } from "@/app/types";
import Amigo from "./Amigo";

// props
interface FriendsProps {
  profile: UserProfile;
  user: SafeUser;
}

// All Friends
// shows all friends, allows adding/removing friend
const AllFriends: React.FC<FriendsProps> = ({
  profile,
  user
}) => {
  // friends
  const { friends } = profile;


  return (
    <div className="flex flex-col gap-2 w-full p-4 bg-white dark:bg-[#242526] border dark:border-0 rounded-md shadow-sm border-neutral-300">

      <div className="flex justify-between">
        {/* heading */}
        <h1 className="text-2xl font-semibold text-black dark:text-[#e4e6eb]">Friends</h1>
      </div>

      {/* friend count */}
      <div className="font-light text-neutral-500 dark:text-neutral-400">
        {friends.length} friend{friends.length === 1 ? "" : "s"}
      </div>
      
      {/* grid */}
      <div className="grid grid-cols-1 gap-2 xs:grid-cols-2 xs:gap-4 grid-auto-rows">
        {friends.map((friend) => (
          <Amigo key={friend.id} friend={friend} user={user} />
        ))}
      </div>
    </div>
  );
};

export default AllFriends;
