"use client"

import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { VscTrash } from "react-icons/vsc";

// props
interface PostMenuProps {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  postId: string;
}

// Post Menu
// menu modal for deleting post
const PostMenu: React.FC<PostMenuProps> = ({
  isOpen,
  setIsOpen,
  postId
}) => {
  // router
  const router = useRouter();

  // ref to menu for click outside
  const menuRef = useRef<HTMLUListElement>(null);

  // close menu when clicked outside
  useEffect(() => {
    if (isOpen) {
      // close menu when clicked outside
      const handleClickOutside = (event: MouseEvent) => {
        if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
          setIsOpen(false);
        }
      };
      // add event listener
      document.addEventListener("click", handleClickOutside);
      return () => {
        document.removeEventListener("click", handleClickOutside);
      };
    }
  }, [isOpen, setIsOpen]);

  // state for disabling button while sending request
  const [isSending, setIsSending] = useState<boolean>(false);

  // delete post
  const handleDeletePost = async () => {
    // disable button
    setIsSending(true);

    // send request
    await axios.delete(`/api/post/${postId}`)
      .then(() => {
        // success
        toast.success('Post deleted');
        // refresh page
        router.refresh();
      })
      .catch(err => {
        // error
        toast.error("Error deleting post");
      })
      .finally(() => {
        // re-enable button
        setIsSending(false);
      });
  };

  return (
    <>
      {isOpen && (
        <ul
          ref={menuRef}
          onClick={(e: React.MouseEvent<HTMLUListElement>) => e.stopPropagation()}
          className="absolute top-[30px] right-0 z-10
          flex flex-col gap-2 p-4 w-[300px]
          bg-white dark:bg-[#242526] rounded-md shadow-lg
          border border-neutral-300 dark:border-[#393b3d]"
        >
          <button
            onClick={handleDeletePost}
            disabled={isSending}
            className="flex flex-row items-center gap-2
            text-neutral-500 dark:text-neutral-400
            rounded-md cursor-pointer duration-300
            hover:bg-neutral-200 dark:hover:bg-[#3a3b3c]"
          >
            <div
              className="flex flex-row items-center justify-center w-9 h-9
              bg-neutral-200 dark:bg-[#3a3b3c] rounded-full"
            >
              <VscTrash size={24} />
            </div>
            <div>Delete post</div>
          </button>
        </ul>
      )}
    </>
  );
};

export default PostMenu;
