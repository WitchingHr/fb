"use client"

import { useContext, useRef, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { AiOutlineLike, AiFillLike } from "react-icons/ai";
import { VscComment } from "react-icons/vsc";
import Link from "next/link";
import { GoKebabHorizontal } from "react-icons/go";

import { UserContext } from "@/app/providers/UserProvider";
import { Post } from "@/app/types";

// components
import Avatar from "../Avatar";
import PostMenu from "../menus/PostMenu";

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
    const res = await axios.post("/api/comment", data)
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
    const res = await axios.post("/api/like", data)
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
    <div className="flex flex-col p-4 bg-white rounded-md shadow-sm">
      <div className="flex flex-col">

        {/* post author */}
        <div className="flex items-center gap-2">
          {/* image */}
          <Avatar user={post.author} size={40} button />

          {/* name and time posted */}
          <div className="flex flex-col">
            <Link href={`/user/${post.author.id}`} className="text-lg hover:underline">{post.author.name}</Link>
            <div className="text-sm font-light text-neutral-500">{post.createdAt}</div>
          </div>

          {/* post menu button */}
          {post.author.id === user.id && (
            <div className="relative ml-auto">
              <button
                onClick={handlePostMenu}
                className="p-1 duration-300 rounded-full text-neutral-500 hover:bg-neutral-100">
                <GoKebabHorizontal size={20} />
              </button>
              <PostMenu isOpen={isOpen} setIsOpen={setIsOpen} postId={post.id} />
            </div>
          )}
        </div>

        {/* post content */}
        <div className="py-2 text-2xl">{post.content}</div>

        {/* display likes count and comments count */}
          <div className="flex">
            {/* likes count */}
            {post.likes.length > 0 && (
              <div className="flex items-center gap-1 pb-1 mr-auto">
                <AiOutlineLike size={12} />
                <div className="text-sm text-neutral-500">
                  {post.likes.length}
                </div>
              </div>
            )}

            {/* comments count */}
            {post.comments.length > 0 && (
              <div className="flex items-center gap-1 pb-1 ml-auto">
                <div className="text-sm text-neutral-500">
                  {post.comments.length}
                </div>
                <VscComment size={12} />
              </div>
            )}
          </div>

        <hr />

        {/* like and comment buttons */}
        <div className="flex justify-around text-xl text-neutral-500">
          <button
            onClick={likePost}
            disabled={loading}
            className={`flex items-center gap-2 px-4 py-2 rounded-md duration-300
            hover:bg-neutral-100 focus:outline-none focus:bg-neutral-100`}
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
            hover:bg-neutral-100 focus:outline-none focus:bg-neutral-100`}
          >
            <VscComment size={20} />
            <div>Comment</div>
          </button>
        </div>

        <hr />

        {/* comments */}
        <div className="flex flex-col">
          {post.comments.length > 0 && (
            <>
              {post.comments.length > 1 && (
                // view more comments button
                <button className="pt-2 text-neutral-500 text-start hover:underline">View more comments</button>
              )}

              
              {/* first comment */}
              <div className="flex gap-2 pt-2">

                {/* author avatar */}
                <Avatar user={post.comments[0].author} size={36} button />

                <div className="flex flex-col">
                  {/* comment author */}
                  <Link
                    href={`/user/${post.comments[0].author.id}`}
                    className="text-sm hover:underline"
                  >
                    {post.comments[0].author.name}
                  </Link>

                  {/* comment content */}
                  <div className="text-sm">{post.comments[0].content}</div>

                  {/* comment time */}
                  <div className="text-xs font-light text-neutral-500">{post.comments[0].createdAt}</div>
                </div>
              </div>
            </>
          )}
          
          {/* user input */}
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
                  className={`flex-1 px-4 py-2 rounded-full bg-neutral-100 hover:bg-neutral-200 duration-300
                    focus:outline-none focus:border-2 focus:border-neutral-300
                    placeholder:font-light placeholder:text-neutral-500`}
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
