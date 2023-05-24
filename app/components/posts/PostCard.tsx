"use client"

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useContext, useRef, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { AiOutlineLike, AiFillLike } from "react-icons/ai";
import { VscComment } from "react-icons/vsc";
import { GoKebabHorizontal } from "react-icons/go";

import { UserContext } from "@/app/providers/UserProvider";
import { Post } from "@/app/types";

import Avatar from "../common/Avatar";
import PostMenu from "../menus/PostMenu";
import PostComments from "./PostComments";
import { RiSendPlaneFill } from "react-icons/ri";

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

  // input ref for focusing
  const inputRef = useRef<HTMLInputElement>(null);

  // toggle comment input view state
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

  // post menu view state
  const [isOpen, setIsOpen] = useState<boolean>(false);

  // toggle post menu
  const handlePostMenu = () => {
    setIsOpen(!isOpen);
  }

  // comment value state
  const [comment, setComment] = useState<string>("");
  
  // loading state for disabling buttons
  const [loading, setLoading] = useState<boolean>(false);
  
  // submit comment
  const submitComment = async (e: React.KeyboardEvent<HTMLInputElement> | React.MouseEvent<HTMLButtonElement>) => {
    const { key } = e as React.KeyboardEvent<HTMLInputElement>;

    // check if not enter key
    if (key && key !== "Enter") return;

    // check if already submitting
    if (loading) return;

    // set loading
    setLoading(true);

    // data
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
      .catch(() => {
        // error
        toast.error("Error posting comment");
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
    
    // disable buttons
    setLoading(true);

    // data
    const data = {
      postId: post.id,
    }

    // send request
    await axios.post("/api/like", data)
      .then((res) => {
        // get response status code
        const response = res.status;

        // toast success
        if (response === 201) {
          toast.success("Post liked");
        } else if (response === 204) {
          toast.success("Post unliked");
        }

        // refresh page
        router.refresh();
      })
      .catch(() => {
        // error
        toast.error("Error liking post");
      })
      .finally(() => {
        // reset state
        setLoading(false);
      });
  }

  return (
    <div
      className="flex flex-col p-4 bg-white dark:bg-[#242526]
      border dark:border-0 border-neutral-300 dark:border-[#e4e6eb]
      rounded-md shadow-sm "
    >
      <div className="flex flex-col">

        {/* post author */}
        <div className="flex items-center gap-2">
          {/* image */}
          <Avatar user={post.author} size={40} button />

          {/* name and time posted */}
          <div className="flex flex-col">
            <Link
              href={`/user/${post.author.id}`}
              className="text-lg text-black dark:text-[#e4e6eb] hover:underline"
            >
              {post.author.name}
            </Link>
            <div
              className="text-sm font-light text-neutral-500 dark:text-neutral-400"
            >
              {post.createdAt}
            </div>
          </div>

          {/* post menu button, opens modal */}
          {post.author.id === user.id && (
            <div className="relative ml-auto">
              <button
                onClick={handlePostMenu}
                className="p-1 duration-300 rounded-full
                text-neutral-500 dark:text-neutral-400
                hover:bg-neutral-100 dark:hover:bg-[#3a3b3c]"
              >
                {/* icon */}
                <GoKebabHorizontal size={20} />
              </button>

              {/* post menu modal */}
              <PostMenu isOpen={isOpen} setIsOpen={setIsOpen} postId={post.id} />
            </div>
          )}
        </div>

        {/* post content */}
        <div className="py-2 text-lg sm:text-2xl text-black dark:text-[#e4e6eb]">
          {post.content}
        </div>

        {/* post image */}
        {post.postImage && (
          <div className="relative w-full mb-2 overflow-hidden rounded-md aspect-square">
            <Image
              alt="post image"
              src={post.postImage}
              fill
              className="object-cover duration-300 hover:scale-110"
            />
          </div>
        )}

        {/* display likes count and comments count */}
          <div className="flex text-neutral-500 dark:text-neutral-400">
            {/* likes count */}
            {post.likes.length > 0 && (
              <div className="flex items-center gap-1 pb-1 mr-auto">
                {/* icon */}
                <AiOutlineLike size={12} />
                {/* count */}
                <div className="text-sm">
                  {post.likes.length}
                </div>
              </div>
            )}

            {/* comments count */}
            {post.comments.length > 0 && (
              <div className="flex items-center gap-1 pb-1 ml-auto">
                {/* count */}
                <div className="text-sm">
                  {post.comments.length}
                </div>
                {/* icon */}
                <VscComment size={12} />
              </div>
            )}
          </div>

        
        <hr className="dark:border-[#393a3b]" />

        {/* like and comment buttons */}
        <div
          className="flex justify-around text-xl text-neutral-500 dark:text-neutral-400"
        >
          <button
            onClick={likePost}
            disabled={loading}
            className="flex items-center gap-2 px-4 py-2
            rounded-md duration-300
            hover:bg-neutral-100 dark:hover:bg-[#3a3b3c]
            focus:outline-none focus:bg-neutral-100"
          >
            {/* if user has liked post, show different icon */}
            {post.likes.some((like) => like.author.id === user.id) ? (
              <>
                {/* filled in icon */}
                <AiFillLike size={20} />
                <div>Liked</div>
              </>
            ) : (
              <>
                {/* outlined icon */}
                <AiOutlineLike size={20} />
                <div>Like</div>
              </>
            )}
          </button>
          <button
            onClick={toggleInput}
            className="flex items-center gap-2 px-4 py-2
            rounded-md duration-300
            hover:bg-neutral-100 dark:hover:bg-[#3a3b3c]
            focus:outline-none focus:bg-neutral-100"
          >
            {/* icon */}
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
          <div
            className={`
              flex items-center gap-2 overflow-hidden duration-1000
              ${viewComment ? "max-h-96 mt-3 py-1" : "max-h-0"}
            `}
          >
            {/* input open */}
            {viewComment && (
              <>
                {/* user avatar */}
                <Avatar user={user} size={36} button />
                <input
                  onKeyDown={(e) => {submitComment(e)}}
                  onChange={(e) => {setComment(e.target.value)}}
                  value={comment}
                  ref={inputRef}
                  maxLength={255}
                  className="flex-1 px-4 py-2 rounded-full
                  bg-neutral-100 dark:bg-[#3a3b3c]
                  text-neutral-500 dark:text-neutral-400
                  placeholder:font-light
                  placeholder:text-neutral-500 dark:placeholder:text-neutral-400
                  duration-300 hover:bg-neutral-200 dark:hover:bg-[#4e4f50] 
                  focus:outline-none focus:border 
                  focus:border-neutral-300 dark:focus:border-neutral-400"
                  placeholder="Write a comment..."
                />
                <button
                  onClick={(e: React.MouseEvent<HTMLButtonElement>) => submitComment(e)}
                >
                  <RiSendPlaneFill
                    size={30}
                    className="text-neutral-500 dark:text-neutral-400"
                  />
                </button>
              </>
              )}
          </div>

        </div>

      </div>
    </div>
  );
};

export default PostCard;
