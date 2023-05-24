"use client"

import { useContext, useEffect } from "react";

import setTheme from "../lib/theme";
import { Notifications, Posts, SafeUser, User } from "../types";
import { UserContext } from "../providers/UserProvider";

// components
import ProfileCreator from "./ProfileCreator";
import Navbar from "../components/navbars/Navbar";
import Sidebar from "../components/navbars/Sidebar";
import PostPrompt from "../components/posts/PostPrompt";
import Sponsored from "../components/home/Sponsored";
import PostCard from "../components/posts/PostCard";
import SuggestedFriends from "../components/home/SuggestedFriends";

// props
interface HomeClientProps {
  currentUser: SafeUser;
  posts: Posts;
  suggestedFriends: User[] | null;
  notifications: Notifications | null;
}

// Home Client
// home page for client
const HomeClient: React.FC<HomeClientProps> = ({
  currentUser,
  posts,
  suggestedFriends,
  notifications
}) => {
  // set theme
  useEffect(() => {
    setTheme();
  }, []);

  // user context
  const { setUser } = useContext(UserContext);

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


  return (
    <div className="flex flex-col h-screen">
      <Navbar notifications={notifications} />

      <div
        className="flex flex-row h-full
        overflow-y-auto lg:lg-layout-grid
        bg-[#f0f2f5] dark:bg-[#18191a]"
      >
        {/* sidebar */}
        <Sidebar />

        {/* post wall */}
        <div
          className="grow flex flex-col gap-2 xs:gap-4 max-w-[680px] 
          lg:post-wall mx-auto lg:mx-4 px-2 xs:px-4 lg:px-0 py-2 xs:py-4"
        >
          {/* create post button */}
          <PostPrompt />

          {/* suggested friends */}
          {suggestedFriends && suggestedFriends.length > 0 && (
            <SuggestedFriends suggestedFriends={suggestedFriends} />
          )}

          {posts === null ? (
            // no posts
            <div className="p-4 text-neutral-500">No posts found...</div>
          ) : (
            posts.map((post) => (
              // render each post
              <PostCard key={post.id} post={post} />
            ))
          )}
        </div>

        {/* sponsored */}
        <Sponsored />

      </div>
    </div>
  );
};

export default HomeClient;
