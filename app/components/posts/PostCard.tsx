"use client"

import { useContext, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";
import { AiOutlineLike, AiFillLike } from "react-icons/ai";
import { VscComment } from "react-icons/vsc";
import { GoKebabHorizontal } from "react-icons/go";

import { UserContext } from "@/app/providers/UserProvider";
import { Post } from "@/app/types";

import Avatar from "../Avatar";
import PostMenu from "../menus/PostMenu";
import PostComments from "./PostComments";
import Image from "next/image";

// props
interface PostCardProps {
  post: Post;
}

// PostCard
// shows a single post
const PostCard: React.FC<PostCardProps> = ({
  post,
}) => {
  // get current user
  const { user } = useContext(UserContext);

  // router
  const router = useRouter();

  // state for opening comment input
  const [viewComment, setViewComment] = useState<boolean>(false);

  // input ref
  const inputRef = useRef<HTMLInputElement>(null);

  // toggle comment input
  const toggleInput = () => {
    // set view state
    setViewComment(!viewComment);

    // opposite because of react's state batching
    if (viewComment !== false) {
      return;
    }

    // focus input after delay
    setTimeout(() => {
      inputRef.current?.focus();
    }, 100);
  };

  // post menu state
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handlePostMenu = () => {
    setIsOpen(!isOpen);
  }

  // comment state
  const [comment, setComment] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  
  // submit comment
  const submitComment = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    // check if enter key
    if (e.key !== "Enter") return;

    // check if already submitting
    if (loading) return;

    // set loading
    setLoading(true);

    const data = {
      postId: post.id,
      content: comment,
    }

    // send request
    await axios.post("/api/comment", data)
      .then(() => {
        // success
        toast.success("Comment posted");
        // refresh page
        router.refresh();
      })
      .catch((err) => {
        // error
        toast.error(err.response.data);
      })
      .finally(() => {
        // reset state
        setLoading(false);
        setComment("");
      });
  }

  // like post
  const likePost = async () => {
    // check if already submitting
    if (loading) return;
    setLoading(true);

    const data = {
      postId: post.id,
    }

    // send request
    await axios.post("/api/like", data)
      .then((res) => {
        // get response status code
        const response = res.data;

        // toast
        if (response.status === 201) {
          toast.success("Post liked");
        } else if (response.status === 204) {
          toast.success("Post unliked");
        }

        // refresh page
        router.refresh();
      })
      .catch((err) => {
        // error
        toast.error(err.response.data);
      })
      .finally(() => {
        // reset state
        setLoading(false);
      });
  }

  return (
    <div className="flex flex-col p-4 bg-white dark:bg-[#242526] border dark:border-0 rounded-md shadow-sm border-neutral-300 dark:border-[#e4e6eb]">
      <div className="flex flex-col">

        {/* post author */}
        <div className="flex items-center gap-2">
          {/* image */}
          <Avatar user={post.author} size={40} button />

          {/* name and time posted */}
          <div className="flex flex-col">
            <Link href={`/user/${post.author.id}`} className="text-lg hover:underline text-black dark:text-[#e4e6eb]">{post.author.name}</Link>
            <div className="text-sm font-light text-neutral-500 dark:text-neutral-400">{post.createdAt}</div>
          </div>

          {/* post menu button */}
          {post.author.id === user.id && (
            <div className="relative ml-auto">
              <button
                onClick={handlePostMenu}
                className="p-1 duration-300 rounded-full text-neutral-500 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-[#3a3b3c]">
                <GoKebabHorizontal size={20} />
              </button>
              <PostMenu isOpen={isOpen} setIsOpen={setIsOpen} postId={post.id} />
            </div>
          )}
        </div>

        {/* post content */}
        <div className="py-2 text-lg sm:text-2xl text-black dark:text-[#e4e6eb]">{post.content}</div>

        {/* post image */}
        {post.postImage && (
          <div className="relative w-full mb-2 overflow-hidden rounded-md aspect-square">
            <Image alt="post image" src={post.postImage} fill className="object-cover duration-300 hover:scale-110" />
          </div>
        )}

        {/* display likes count and comments count */}
          <div className="flex text-neutral-500 dark:text-neutral-400">
            {/* likes count */}
            {post.likes.length > 0 && (
              <div className="flex items-center gap-1 pb-1 mr-auto">
                <AiOutlineLike size={12} />
                <div className="text-sm">
                  {post.likes.length}
                </div>
              </div>
            )}

            {/* comments count */}
            {post.comments.length > 0 && (
              <div className="flex items-center gap-1 pb-1 ml-auto">
                <div className="text-sm">
                  {post.comments.length}
                </div>
                <VscComment size={12} />
              </div>
            )}
          </div>

        
        <hr className="dark:border-[#393a3b]" />

        {/* like and comment buttons */}
        <div className="flex justify-around text-xl text-neutral-500 dark:text-neutral-400">
          <button
            onClick={likePost}
            disabled={loading}
            className={`flex items-center gap-2 px-4 py-2 rounded-md duration-300
            hover:bg-neutral-100 dark:hover:bg-[#3a3b3c] focus:outline-none focus:bg-neutral-100`}
          >
            {post.likes.some((like) => like.author.id === user.id) ? (
              <>
                <AiFillLike size={20} />
                <div>Liked</div>
              </>
            ) : (
              <>
                <AiOutlineLike size={20} />
                <div>Like</div>
              </>
            )}
          </button>
          <button
            onClick={toggleInput}
            className={`flex items-center gap-2 px-4 py-2 rounded-md duration-300
            hover:bg-neutral-100 dark:hover:bg-[#3a3b3c] focus:outline-none focus:bg-neutral-100`}
          >
            <VscComment size={20} />
            <div>Comment</div>
          </button>
        </div>

        <hr className="dark:border-[#393a3b]" />

        {/* comments */}
        <div className="flex flex-col">

          {/* display all comments */}
          <PostComments comments={post.comments} />
          
          {/* user input for new comment */}
          <div className={`flex items-center gap-2 overflow-hidden duration-1000 transition
            ${viewComment ? "max-h-96 mt-3 py-1" : "max-h-0"}`}
          >
            {viewComment && (
              <>
                <Avatar user={user} size={36} button />
                <input
                  onKeyDown={(e) => {submitComment(e)}}
                  onChange={(e) => {setComment(e.target.value)}}
                  value={comment}
                  ref={inputRef}
                  className={`flex-1 px-4 py-2 rounded-full bg-neutral-100 text-neutral-500 dark:text-neutral-400
                  hover:bg-neutral-200 duration-300 dark:bg-[#3a3b3c] dark:hover:bg-[#4e4f50]
                    focus:outline-none focus:border focus:border-neutral-300 dark:focus:border-neutral-400
                    placeholder:font-light placeholder:text-neutral-500 dark:placeholder:text-neutral-400`}
                  placeholder="Write a comment..."
                />
              </>
              )}
          </div>

        </div>

      </div>
    </div>
  );
};

export default PostCard;
