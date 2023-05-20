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
    <div className="flex flex-col gap-2 p-4 bg-white border rounded-md shadow-sm border-neutral-300">
      <div className="flex flex-row items-center gap-2">
        <Avatar user={user} size={40} button />
        <button
          onClick={postModal.onOpen}
          className={`flex-1 p-3 font-light transition duration-300 rounded-full
          text-start bg-neutral-100 text-neutral-500 hover:bg-neutral-200`}
        >
          What&#39;s on your mind, {user.name.split(' ')[0]}?
        </button>
      </div>
    </div>
  );
};

export default PostPrompt;
