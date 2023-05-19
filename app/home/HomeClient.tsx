"use client"

import { Posts, SafeUser } from "../types";

// components
import ProfileCreator from "./ProfileCreator";
import Navbar from "../components/navbars/Navbar";
import Sidebar from "../components/navbars/Sidebar";
import PostPrompt from "../components/posts/PostPrompt";
import Sponsored from "../components/Sponsored";
import PostCard from "../components/posts/PostCard";
import { useContext, useEffect } from "react";
import { UserContext } from "../providers/UserProvider";

// props
interface HomeClientProps {
  currentUser: SafeUser;
  posts: Posts;
}

// Home Client
// home page for client
const HomeClient: React.FC<HomeClientProps> = ({
  currentUser,
  posts
}) => {
  // user context
  const { user, setUser } = useContext(UserContext);

  // set user
  useEffect(() => {
    setUser({
      id: currentUser.id,
      name: currentUser.name,
      image: currentUser.profile?.image
    });
  }, [currentUser.id, currentUser.name, currentUser.profile?.image, setUser]);

  // if user has no profile, show profile creator
  if (!currentUser.profile) {
    return <ProfileCreator currentUser={currentUser} />;
  }

  // current user avatar
  const userAvatar = {
    id: currentUser.id,
    name: currentUser.name,
    image: currentUser.profile.image
  };

  return (
    <div className="flex flex-col h-screen">
      <Navbar />

      <div className="flex flex-row justify-between h-full">
        {/* sidebar */}
        <Sidebar />

        {/* post wall */}
        <div className="flex flex-col gap-2 max-w-[680px] grow shrink-0 mx-2 py-4">
          <PostPrompt />

          {posts === null ? (
            // no posts
            <div className="p-4 text-neutral-500">No posts found...</div>
          ) : (
            // iterate posts
            posts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))
          )}
        </div>

        {/* sponsored */}
        <div className="md:flex flex-col px-2 py-4 hidden lg:ml-[25px]">
          <Sponsored />
        </div>

      </div>
    </div>
  );
};

export default HomeClient;
