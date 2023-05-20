"use client"

import { useState } from "react";

import { Comment } from "@/app/types";

import SingleComment from "./Comment";

// props
interface PostCommentsProps {
  comments: Comment[];
}

// PostComments
// shows comments, if any, for a post
// defaults to showing only the first comment, expandable
const PostComments: React.FC<PostCommentsProps> = ({
  comments,
}) => {
  // for toggling comment view
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <>
      {comments.length > 0 && (
        <>
          {comments.length > 1 && (
            // view more comments button
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="pt-2 text-neutral-500 text-start hover:underline"
            >
              {isOpen ? "Collapse comments" : `View ${comments.length - 1} more comment${comments.length > 2 ? "s" : ""}`}
            </button>
          )}

          {!isOpen ? (
            // show first comment by default
            <SingleComment comment={comments[0]} />
          ) : (
            comments.map((comment) => (
              // show all comments if user has clicked the button
              <SingleComment key={comment.id} comment={comment} />
            ))
          )}
        </>
      )}
    </>
  );
};

export default PostComments;
