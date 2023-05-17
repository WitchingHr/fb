"use client"

import Navbar from "@/app/components/navbars/Navbar";
import { Post, Profile } from "@prisma/client";
import { SafeUser } from "@/app/types/types";
import Sidebar from "@/app/components/navbars/Sidebar";
import Avatar from "@/app/components/Avatar";
import { MdModeEditOutline } from "react-icons/md";
import { useState } from "react";
import PostPrompt from "@/app/components/posts/PostPrompt";
import Intro from "@/app/components/profile/Intro";

interface ProfileClientProps {
  profile: SafeUser & {
    profile: Profile | null;
    posts: Post[];
  };
  currentUser: SafeUser & {
    profile: Profile | null;
  };
}

const ProfileClient: React.FC<ProfileClientProps> = ({
  profile,
  currentUser,
}) => {
  const [selected, setSelected] = useState<String>("Posts");
  return (
    <div className="flex flex-col h-screen">
      <Navbar currentUser={currentUser} />
      <div className="flex flex-row flex-1 overflow-y-auto">
        <Sidebar currentUser={currentUser} profile />
        <div className="flex flex-col flex-1">

          {/* upper */}
          <div className="z-10 bg-white border-b shadow-sm border-neutral-300">
            <div className="max-w-[1250px] mx-auto">
              {/* cover */}
              <div className="w-full bg-black h-[25vh] rounded-b-lg">a</div>
              {/* profile */}
              <div className="relative flex flex-col items-center justify-center gap-2 px-4 pb-4 md:flex-row md:justify-start">
                {/* avatar */}
                <div className="border-4 border-white w-[170px] rounded-full -top-[85px] absolute md:-top-[30px]">
                  <Avatar currentUser={profile} size={170} />
                </div>
                {/* name and friend count */}
                <div className="flex flex-col items-center gap-1 mt-[90px] md:mt-0 md:items-start md:ml-[184px] md:h-[136px] md:pt-4">
                  <div className="text-3xl font-bold">{profile.name}</div>
                  <div className="text-lg text-neutral-500">
                    {profile.friendsIds.length} friends
                  </div>
                </div>
                <button className={`
                  flex flex-row items-center gap-2 px-4 py-2 transition duration-300
                  rounded bg-neutral-200 hover:bg-neutral-300 md:ml-auto md:mt-auto`}>
                  <MdModeEditOutline size={20} />
                  <div>Edit profile</div>
                </button>
              </div>
              <div className="px-4">
                <hr className="w-full border-neutral-300" />
                <ul className="flex flex-row justify-around w-full md:justify-start md:gap-4 text-neutral-500">
                  <li
                    className={`p-4 cursor-pointer
                      ${selected === "Posts"
                        ? "text-[#1a77f2] profile-selected relative"
                        : "text-neutral-500"}
                        hover:bg-neutral-200 rounded-md duration-300 transition`}
                    onClick={() => setSelected("Posts")}
                  >
                    Posts
                  </li>
                  <li
                    className={`p-4 cursor-pointer ${selected === "About"
                    ? "text-[#1a77f2] profile-selected relative"
                    : "text-neutral-500"}
                    hover:bg-neutral-200 rounded-md duration-300 transition`}
                onClick={() => setSelected("About")}
                  >
                    About
                  </li>
                  <li
                    className={`p-4 cursor-pointer ${selected === "Friends"
                    ? "text-[#1a77f2] profile-selected relative"
                    : "text-neutral-500"}
                    hover:bg-neutral-200 rounded-md duration-300 transition`}
                onClick={() => setSelected("Friends")}
                  >
                    Friends
                  </li>
                  <li
                    className={`p-4 cursor-pointer ${selected === "Photos"
                    ? "text-[#1a77f2] profile-selected relative"
                    : "text-neutral-500"}
                    hover:bg-neutral-200 rounded-md duration-300 transition`}
                onClick={() => setSelected("Photos")}
                  >
                    Photos
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* lower */}
          <div className="flex-1">
            <div className="max-w-[1250px] mx-auto flex flex-col gap-4 p-4 lg:flex-row">

              {/* left */}
              <div className="flex-[.75]">
                <Intro profile={profile.profile!} />
              </div>

              {/* right */}
              <div className="flex-1">
                <PostPrompt currentUser={currentUser} />
              </div>
              
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileClient;
