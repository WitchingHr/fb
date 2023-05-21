"use client"

import { useContext, useEffect, useState } from "react";

import { Posts, UserProfile, SafeUser } from "@/app/types";
import { UserContext } from "@/app/providers/UserProvider";
import theme from "@/app/lib/theme";

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
import AllFriends from "@/app/components/profile/AllFriends";
import About from "@/app/components/profile/About";
import Image from "next/image";
import useCoverModal from "@/app/hooks/useCoverModal";
import { MdOutlineAddPhotoAlternate } from "react-icons/md";

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

  // cover modal
  const coverModal = useCoverModal();

  // selected tab
  const [selected, setSelected] = useState<string>("Posts");

  // set theme
  useEffect(() => {
    theme();
  }, []);

  return (
    <div className="flex flex-col h-screen">
      <Navbar />
      <div className="flex flex-row flex-1 overflow-hidden">
        <Sidebar profile />
        <div className="flex flex-col flex-1 overflow-y-auto">

          {/* upper */}
          <div className="z-10 bg-white dark:bg-[#242526] border-b shadow-sm border-neutral-300 dark:border-[#393b3d]">
            <div className="max-w-[1250px] mx-auto">
              {/* cover image */}
              <div className="w-full bg-black h-[25vh] rounded-b-lg overflow-hidden relative">
                {profile.id === currentUser.id && (
                  <>
                    {profile.profile!.cover && (
                      <Image src={profile.profile!.cover} alt="profile cover image" fill className="object-cover" />
                    )}
                    <button
                      onClick={coverModal.onOpen}
                      className={`
                      flex flex-row items-center gap-2 p-4 py-2 bg-transparent transition absolute
                      duration-300 text-black dark:text-[#e4e6eb] bottom-4 right-4
                      rounded sm:bg-neutral-200 dark:sm:bg-[#3a3b3c] dark:hover:bg-[#4e4f50] hover:bg-neutral-300`}>
                      <div className="hidden sm:block">Edit cover photo</div>
                      <MdOutlineAddPhotoAlternate size={20} className="sm:hidden text-neutral-300" />
                    </button>
                  </>
                )}
              </div>

              <div className="relative flex flex-col items-center justify-center gap-2 px-2 pb-4 xs:px-4 md:flex-row md:justify-start">
                {/* user avatar */}
                <div className="border-4 border-white dark:border-[#242526] w-[170px] rounded-full -top-[85px] absolute md:-top-[30px]">
                  <Avatar user={userAvatar} size={170} />
                </div>

                <div className="flex flex-col items-center gap-1 mt-[90px] md:mt-0 md:items-start md:ml-[184px] md:h-[136px] md:pt-4">

                  {/* user name */}
                  <div className="text-3xl font-bold text-black dark:text-[#e4e6eb]">{profile.name}</div>

                  {/* friend count */}
                  <div className="text-lg text-neutral-500 dark:text-neutral-400">
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
            <div className="max-w-[1250px]  mx-auto flex flex-col gap-2 xs:gap-4 p-2 xs:p-4 lg:flex-row">

              {selected === "Posts" && (
                  <>
                  {/* left column */}
                  <div className="flex-[.75] flex flex-col gap-2 xs:gap-4">
                    <Intro profile={profile.profile!} />
                    <Friends friends={profile.friends} seeAll={() => setSelected("Friends")} />
                  </div>

                  {/* right column */}
                  <div className="flex flex-col flex-1 gap-2 xs:gap-4">
                    {user.id === profile.id && (
                      <PostPrompt />
                    )}
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
              
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileClient;
