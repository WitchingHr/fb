"use client"

import { useContext, useEffect } from "react";

import { Notifications, Posts, SafeUser, User } from "../types";
import { UserContext } from "../providers/UserProvider";

// components
import ProfileCreator from "./ProfileCreator";
import Navbar from "../components/navbars/Navbar";
import Sidebar from "../components/navbars/Sidebar";
import PostPrompt from "../components/posts/PostPrompt";
import Sponsored from "../components/Sponsored";
import PostCard from "../components/posts/PostCard";
import SuggestedFriends from "../components/home/SuggestedFriends";
import theme from "../lib/theme";

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
    theme();
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

      <div className="flex flex-row h-full bg-[#f0f2f5] dark:bg-[#18191a] overflow-hidden lg:lg-layout-grid">
        {/* sidebar */}
        <Sidebar />

        {/* post wall */}
        <div className="flex flex-col gap-2 xs:gap-4 mx-auto lg:mx-4 max-w-[680px] px-2 xs:px-4 lg:px-0 py-2 xs:py-4 grow overflow-y-auto">
          <PostPrompt />

          {suggestedFriends && suggestedFriends.length > 0 && (
            <SuggestedFriends suggestedFriends={suggestedFriends} />
          )}

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
        <Sponsored />

      </div>
    </div>
  );
};

export default HomeClient;
