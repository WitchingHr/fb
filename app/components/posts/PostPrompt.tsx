"use client"

import { Profile } from "@prisma/client";
import Avatar from "../Avatar";
import { SafeUser } from "@/app/types/types";

interface PostPromptProps {
  currentUser: SafeUser & {
    profile: Profile | null;
  };
}

// PostPrompt
// opens post composer
const PostPrompt: React.FC<PostPromptProps> = ({
  currentUser,
}) => {
  return (
    <div className="flex flex-col gap-2 p-4 bg-white rounded-md shadow-sm">
      <div className="flex flex-row items-center gap-2">
        <Avatar currentUser={currentUser} size={40} />
        <button className={`flex-1 p-3 font-light transition duration-300 rounded-full
          text-start bg-neutral-100 text-neutral-500 hover:bg-neutral-200`}
        >
          What&#39;s on your mind, {currentUser.name.split(' ')[0]}?
        </button>
      </div>
    </div>
  );
};

export default PostPrompt;
