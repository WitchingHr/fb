"use client"

import { useRouter } from "next/navigation";
import { useContext } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";

import { UserContext } from "@/app/providers/UserProvider";
import { Comment } from "@/app/types";

import Avatar from "../common/Avatar";
import Link from "next/link";

// props
interface CommentProps {
  comment: Comment;
}

// Comment
// shows a single comment
const Comment: React.FC<CommentProps> = ({
  comment,
}) => {
  // router
  const router = useRouter();

  // get current user
  const { user } = useContext(UserContext);

  // delete comment
  const handleDeleteComment = async () => {
    // make request
    await axios.delete(`/api/comment/${comment.id}`)
      .then(() => {
        // show success message
        toast.success("Comment deleted successfully!");
        // reload page
        router.refresh();
      })
      .catch(() => {
        // toast error
        toast.error("Error deleting comment");
      });
  };

  return (
    <div className="flex gap-2 pt-2 group">

      {/* author avatar */}
      <Avatar user={comment.author} size={36} button />

      <div className="flex flex-col flex-1">
        {/* comment author */}
        <Link
          href={`/user/${comment.author.id}`}
          className="max-w-min text-sm whitespace-nowrap
          text-black dark:text-[#e4e6eb] hover:underline"
        >
          {comment.author.name}
        </Link>

        {/* comment content */}
        <div className="text-sm text-black dark:text-[#e4e6eb]">{comment.content}</div>

        {/* comment time */}
        <div className="flex gap-2 text-neutral-500 dark:text-neutral-400">
          <div className="text-xs font-light">
            {comment.createdAt}
          </div>
          
          {/* if author, show delete button */}
          {comment.author.id === user.id && (
            <button
              onClick={handleDeleteComment}
              className="hidden ml-auto text-xs hover:underline group-hover:block"
            >
              Delete comment
            </button>
          )}
        </div>
      </div>

    </div>
  );
};

export default Comment;
