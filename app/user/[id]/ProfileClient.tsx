"use client"

import Image from "next/image";
import { useEffect, useState } from "react";
import { TbPhotoPlus } from "react-icons/tb";
import { MdOutlineAddPhotoAlternate } from "react-icons/md";

import { Posts, UserProfile, SafeUser, Notifications } from "@/app/types";
import setTheme from "@/app/lib/theme";
import useAvatarModal from "@/app/hooks/useAvatarModal";
import useCoverModal from "@/app/hooks/useCoverModal";

import Sidebar from "@/app/components/navbars/Sidebar";
import Avatar from "@/app/components/common/Avatar";
import PostPrompt from "@/app/components/posts/PostPrompt";
import Intro from "@/app/components/profile/Intro";
import PostCard from "@/app/components/posts/PostCard";
import Navbar from "@/app/components/navbars/Navbar";
import Friends from "@/app/components/profile/Friends";
import FriendOrEditButton from "@/app/components/profile/FriendOrEditButton";
import ProfileNavbar from "@/app/components/profile/ProfileNavbar";
import AllFriends from "@/app/components/profile/AllFriends";
import About from "@/app/components/profile/About";
import Photos from "@/app/components/profile/Photos";

// props
interface ProfileClientProps {
  profile: UserProfile;
  posts: Posts;
  currentUser: SafeUser;
  notifications: Notifications | null;
}

// Profile Client
// profile page for user
const ProfileClient: React.FC<ProfileClientProps> = ({
  profile,
  currentUser,
  posts,
  notifications
}) => {

  // profile user avatar
  const userAvatar = {
    id: profile.id,
    name: profile.name,
    image: profile.profile?.image
  };

  // check if user is friend
  const isFriend = profile.friends.some((friend) => friend.id === currentUser.id);

  // cover modal
  const coverModal = useCoverModal();

  // avatar modal
  const avatarModal = useAvatarModal();

  // selected tab
  const [selected, setSelected] = useState<string>("Posts");

  // set theme
  useEffect(() => {
    setTheme();
  }, []);

  return (
    <div className="flex flex-col h-screen">
      <Navbar notifications={notifications}  />
      <div className="flex flex-row flex-1 overflow-hidden">

        {/* sidebar */}
        <Sidebar profile />

        {/* profile */}
        <div className="flex flex-col flex-1 overflow-y-auto">

          {/* upper */}
          <div
            className="z-10 bg-white dark:bg-[#242526]
            border-b border-neutral-300 dark:border-[#393b3d] shadow-sm"
          >
            <div className="max-w-[1250px] mx-auto">
              {/* cover image */}
              <div className="relative w-full h-[25vh] overflow-hidden bg-black rounded-b-lg">
                {profile.profile!.cover && (
                  <Image
                    src={profile.profile!.cover}
                    alt="profile cover image"
                    fill
                    className="object-cover"
                  />
                )}
                {profile.id === currentUser.id && (
                  // if on own profile, show edit cover photo button
                  <button
                    onClick={coverModal.onOpen}
                    className="absolute bottom-4 right-4
                    flex flex-row items-center gap-2 p-4 py-2
                    text-black dark:text-[#e4e6eb] rounded
                    bg-transparent sm:bg-neutral-200 dark:sm:bg-[#3a3b3c]
                    duration-300 dark:hover:bg-[#4e4f50] hover:bg-neutral-300"
                  >
                    <div className="hidden sm:block">
                      Edit cover photo
                    </div>
                    {/* icon */}
                    <MdOutlineAddPhotoAlternate
                      size={20}
                      className="sm:hidden text-neutral-300"
                    />
                  </button>
                )}
              </div>

              <div
                className="relative flex flex-col items-center justify-center gap-2 px-2 pb-4 md:flex-row md:justify-start xs:px-4"
              >
                {/* user avatar */}
                {profile.id === currentUser.id ? (
                  // if on own profile, avatar is a button to edit avatar
                  <button
                    onClick={avatarModal.onOpen}
                    className="absolute -top-[85px] md:-top-[30px] w-[170px] rounded-full
                    group overflow-hidden border-4 border-white dark:border-[#242526]"
                  >
                    <div
                      className="absolute flex items-center justify-center w-full h-full duration-300 opacity-0 group-hover:opacity-100 group-hover:bg-black/30"
                    >
                      {/* icon */}
                      <TbPhotoPlus
                        size={50}
                        className="z-50 text-neutral-300"
                      />
                    </div>
                    {/* avatar image */}
                    <Avatar user={userAvatar} size={170} />
                  </button>
                ) : (
                  // if on another user's profile, avatar is not a button
                  <div
                    className="absolute -top-[85px] md:-top-[30px] w-[170px] rounded-full
                    border-4 border-white dark:border-[#242526]"
                  >
                    <Avatar user={userAvatar} size={170} />
                  </div>
                )}

                <div
                  className="flex flex-col items-center md:items-start gap-1
                  mt-[90px] md:mt-0 md:ml-[184px] md:h-[136px] md:pt-4"
                >
                  {/* user name */}
                  <div
                    className="text-3xl font-bold text-black dark:text-[#e4e6eb]"
                  >
                    {profile.name}
                  </div>

                  {/* friend count */}
                  <div
                    className="text-lg text-neutral-500 dark:text-neutral-400"
                  >
                    {profile.friends.length} friend{profile.friends.length === 1 ? "" : "s"}
                  </div>
                </div>
                
                {/* add or remove friend button, edit profile button if on own page */}
                <FriendOrEditButton
                  profile={profile}
                  isFriend={isFriend}
                />

              </div>

              <div className="px-2 xs:px-4">
                <hr className="w-full border-neutral-300 dark:border-[#393b3d]" />

                {/* Posts, About, Friends, Photos */}
                <ProfileNavbar
                  selected={selected}
                  setSelected={setSelected}
                />
              </div>
            </div>
          </div>

          {/* lower section: user info, friends, and posts */}
          <div className="flex-1 bg-[#f0f2f5] dark:bg-[#18191a]">
            <div
              className="flex flex-col lg:flex-row max-w-[1250px]
              gap-2 xs:gap-4 mx-auto p-2 xs:p-4"
            >

              {selected === "Posts" && (
                <>
                  {/* left column */}
                  <div className="flex-[.75] flex flex-col gap-2 xs:gap-4">
                    <Intro profile={profile.profile!} />
                    <Friends
                      friends={profile.friends}
                      seeAll={() => setSelected("Friends")}
                    />
                  </div>

                  {/* right column */}
                  <div className="flex flex-col flex-1 gap-2 xs:gap-4">

                    {/* if on own profile page, show post creator */}
                    {currentUser.id === profile.id && (
                      <PostPrompt />
                    )}

                    {/* render user's posts */}
                    {posts?.map((post) => (
                      <PostCard post={post} key={post.id} />
                    ))}
                  </div>
                </>
              )}

              {selected === "About" && (
                <About profile={profile} />
              )}

              {selected === "Friends" && (
                <AllFriends profile={profile} user={currentUser} />
              )}

              {selected === "Photos" && (
                <Photos profile={profile} />
              )}
              
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileClient;
