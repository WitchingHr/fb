"use client"

import { useContext, useEffect, useState } from "react";

import { Posts, UserProfile, SafeUser } from "@/app/types";
import { UserContext } from "@/app/providers/UserProvider";

// components
import Sidebar from "@/app/components/navbars/Sidebar";
import Avatar from "@/app/components/Avatar";
import PostPrompt from "@/app/components/posts/PostPrompt";
import Intro from "@/app/components/profile/Intro";
import PostCard from "@/app/components/posts/PostCard";
import Navbar from "@/app/components/navbars/Navbar";
import Friends from "@/app/components/profile/Friends";
import FriendOrEditButton from "@/app/components/profile/FriendOrEditButton";
import ProfileNavbar from "@/app/components/profile/ProfileNavbar";

// props
interface ProfileClientProps {
  profile: UserProfile;
  posts: Posts;
  currentUser: SafeUser;
}

// Profile Client
// profile page for user
const ProfileClient: React.FC<ProfileClientProps> = ({
  profile,
  currentUser,
  posts
}) => {
  // user context
  const { user, setUser } = useContext(UserContext);

  // set current user
  useEffect(() => {
    setUser({
      id: currentUser.id,
      name: currentUser.name,
      image: currentUser.profile?.image
    });
  }, [currentUser.id, currentUser.name, currentUser.profile?.image, setUser]);

  // profile user avatar
  const userAvatar = {
    id: profile.id,
    name: profile.name,
    image: profile.profile?.image
  };

  // check if user is friend
  const isFriend = profile.friends.some((friend) => friend.id === user.id);

  // selected tab
  const [selected, setSelected] = useState<string>("Posts");

  return (
    <div className="flex flex-col h-screen">
      <Navbar />
      <div className="flex flex-row flex-1 overflow-hidden">
        <Sidebar profile />
        <div className="flex flex-col flex-1 overflow-y-auto">

          {/* upper */}
          <div className="z-10 bg-white border-b shadow-sm border-neutral-300">
            <div className="max-w-[1250px] mx-auto">
              {/* cover image */}
              <div className="w-full bg-black h-[25vh] rounded-b-lg">a</div>

              <div className="relative flex flex-col items-center justify-center gap-2 px-4 pb-4 md:flex-row md:justify-start">
                {/* user avatar */}
                <div className="border-4 border-white w-[170px] rounded-full -top-[85px] absolute md:-top-[30px]">
                  <Avatar user={userAvatar} size={170} />
                </div>

                <div className="flex flex-col items-center gap-1 mt-[90px] md:mt-0 md:items-start md:ml-[184px] md:h-[136px] md:pt-4">

                  {/* user name */}
                  <div className="text-3xl font-bold">{profile.name}</div>

                  {/* friend count */}
                  <div className="text-lg text-neutral-500">
                    {profile.friends.length} friend{profile.friends.length === 1 ? "" : "s"}
                  </div>

                </div>
                
                {/* add or remove friend button, edit profile button if on own page */}
                <FriendOrEditButton
                  profile={profile}
                  user={user}
                  isFriend={isFriend}
                />

              </div>

              <div className="px-4">
                <hr className="w-full border-neutral-300" />

                {/* Posts, About, Friends, Photos */}
                <ProfileNavbar
                  selected={selected}
                  setSelected={setSelected}
                />

              </div>

            </div>
          </div>

          {/* lower section: user info, friends, and posts */}
          <div className="flex-1">
            <div className="max-w-[1250px] mx-auto flex flex-col gap-4 p-4 lg:flex-row">

              {/* left column */}
              <div className="flex-[.75] flex flex-col gap-4">
                <Intro profile={profile.profile!} />
                <Friends friends={profile.friends} />
              </div>

              {/* right column */}
              <div className="flex flex-col flex-1 gap-4">
                {user.id === profile.id && (
                  <PostPrompt />
                )}
                {posts?.map((post) => (
                  <PostCard post={post} key={post.id} />
                ))}
              </div>
              
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileClient;
