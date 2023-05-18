"use client"

import { BiLike } from "react-icons/bi";
import { VscComment } from "react-icons/vsc";

import { DateTime } from "luxon";

// components
import Avatar from "../Avatar";

// props
interface PostCardProps {
  post: any;
}

// PostCard
// shows a single post
const PostCard: React.FC<PostCardProps> = ({
  post
}) => {
  const createdAt = DateTime.fromISO(post.createdAt).toLocaleString(DateTime.DATETIME_MED);

  return (
    <div className="flex flex-col p-4 bg-white rounded-md shadow-sm">
      <div className="flex flex-col">

        <div className="flex items-center gap-2">
          <Avatar currentUser={post.author} size={40} />

          <div className="flex flex-col">
            <div className="text-lg">{post.author.name}</div>
            <div className="text-sm font-light text-neutral-500">{createdAt}</div>
          </div>
        </div>

        <div className="py-2 text-2xl">{post.content}</div>

        <hr />

        <div className="flex justify-around text-xl text-neutral-500">
          <button className="flex items-center gap-2 px-4 py-2 rounded-md hover:bg-neutral-100">
            <BiLike size={20} />
            <div>Like</div>
          </button>
          <button className="flex items-center gap-2 px-4 py-2 rounded-md hover:bg-neutral-100">
            <VscComment size={20} />
            <div>Comment</div>
          </button>
        </div>

        <hr />

      </div>
    </div>
  );
};

export default PostCard;
