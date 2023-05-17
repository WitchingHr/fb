"use client"

import { Profile, User } from "@prisma/client";

// components
import ProfileCreator from "./ProfileCreator";
import Navbar from "./components/navbars/Navbar";
import Sidebar from "./components/navbars/Sidebar";
import PostPrompt from "./components/posts/PostPrompt";
import Sponsored from "./components/Sponsored";

// props
interface HomeClientProps {
  currentUser: User & {
    profile: Profile | null;
  };
}

// Home Client
// home page for client
const HomeClient: React.FC<HomeClientProps> = ({
  currentUser,
}) => {
  // if user has no profile, show profile creator
  if (!currentUser.profile) {
    return <ProfileCreator currentUser={currentUser} />;
  }

  return (
    <div className="flex flex-col h-screen">
      <Navbar currentUser={currentUser} />

      <div className="flex flex-row justify-between h-full">
        {/* sidebar */}
        <Sidebar currentUser={currentUser} />

        {/* post wall */}
        <div className="flex flex-col gap-2 max-w-[680px] grow shrink-0 mx-2">
          <PostPrompt currentUser={currentUser} />
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
