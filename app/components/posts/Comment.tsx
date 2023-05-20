"use client"

import { useContext } from "react";
import { UserContext } from "@/app/providers/UserProvider";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";

import { Comment } from "@/app/types";

import Avatar from "../Avatar";
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
    try {
      // make request
      await axios.delete(`/api/comment/${comment.id}`);

      // show success message
      toast.success("Comment deleted successfully!");

      // reload page
      router.refresh();
    } catch (error: any) {
      // show error message
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="flex gap-2 pt-2 group">

      {/* author avatar */}
      <Avatar user={comment.author} size={36} button />

      <div className="flex flex-col flex-1">
        {/* comment author */}
        <Link
          href={`/user/${comment.author.id}`}
          className="text-sm hover:underline max-w-min whitespace-nowrap"
        >
          {comment.author.name}
        </Link>

        {/* comment content */}
        <div className="text-sm">{comment.content}</div>

        {/* comment time */}
        <div className="flex gap-2">
          <div className="text-xs font-light text-neutral-500">{comment.createdAt}</div>
          {comment.author.id === user.id && (
            <button
              onClick={handleDeleteComment}
              className="hidden ml-auto text-xs text-neutral-500 hover:underline group-hover:block"
            >Delete comment</button>
          )}
        </div>
      </div>

    </div>
  );
};

export default Comment;
