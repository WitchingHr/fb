"use client"

import { useContext } from "react";

import { UserContext } from "@/app/providers/UserProvider";
import usePostModal from "@/app/hooks/usePostModal";

// components
import Avatar from "../Avatar";

// PostPrompt
// opens post composer
const PostPrompt = () => {
  // get user
  const { user } = useContext(UserContext);

  const postModal = usePostModal();
  return (
    <div className="flex flex-col gap-2 p-4 bg-white dark:bg-[#242526] border border-neutral-300 dark:border-0 rounded-md shadow-sm ">
      <div className="flex flex-row items-center gap-2">
        <Avatar user={user} size={40} button />
        <button
          onClick={postModal.onOpen}
          className={`flex-1 p-3 font-light transition duration-300 rounded-full dark:text-neutral-400 text-neutral-500
          text-start bg-neutral-100 dark:bg-[#3a3b3c] hover:bg-neutral-200 dark:hover:bg-[#4e4f50]`}
        >
          What&#39;s on your mind, {user.name.split(' ')[0]}?
        </button>
      </div>
    </div>
  );
};

export default PostPrompt;
