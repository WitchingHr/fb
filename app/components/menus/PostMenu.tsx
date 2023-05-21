"use client"

import axios from "axios";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { toast } from "react-hot-toast";
import { VscTrash } from "react-icons/vsc";

// props
interface PostMenuProps {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  postId: string;
}

// User Menu
// dropdown menu for user profile link and logout
const PostMenu: React.FC<PostMenuProps> = ({
  isOpen,
  setIsOpen,
  postId
}) => {
  // router
  const router = useRouter();

  // ref to menu
  const menuRef = useRef<HTMLUListElement>(null);

  // close menu when clicked outside
  useEffect(() => {
    if (isOpen) {
      const handleClickOutside = (event: MouseEvent) => {
        if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
          setIsOpen(false);
        }
      };
      document.addEventListener("click", handleClickOutside);
      return () => {
        document.removeEventListener("click", handleClickOutside);
      };
    }
  }, [isOpen, setIsOpen]);

  const [isSending, setIsSending] = useState<boolean>(false);

  // delete post
  const handleDeletePost = async () => {
    // disable button
    setIsSending(true);

    // send request
    const res = await axios.delete(`/api/post/${postId}`)
      .then(res => {
        // success
        toast.success('Post deleted');
        // refresh page
        router.refresh();
      })
      .catch(err => {
        // error
        toast.error(err.response.data);
      })
      .finally(() => {
        // re-enable button
        setIsSending(false);
      });
  };

  return (
    <>
      {isOpen && (
        <ul ref={menuRef} onClick={(e) => e.stopPropagation()}
          className={`absolute top-[30px] right-0 flex w-[300px] flex-col dark:bg-[#242526] dark:border-[#393b3d]
            gap-2 p-4 bg-white rounded-md shadow-lg border border-neutral-300`}>
          <button
            onClick={handleDeletePost}
            disabled={isSending}
            className={`flex flex-row items-center gap-2 transition text-neutral-500 dark:text-neutral-400
              duration-300 rounded-md cursor-pointer hover:bg-neutral-200 dark:hover:bg-[#3a3b3c]`}>
            <div
              className="flex flex-row items-center justify-center rounded-full w-9 h-9 bg-neutral-200 dark:bg-[#3a3b3c]">
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
