"use client"

import { useContext, useEffect, useState } from "react";
import { MdModeEditOutline } from "react-icons/md";
import { IoPersonAdd } from "react-icons/io5";
import { BsPersonCheckFill } from "react-icons/bs";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

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
  const router = useRouter();
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
  const [selected, setSelected] = useState<String>("Posts");

  // disable add friend button while sending request
  const [isSending, setIsSending] = useState<boolean>(false);

  // add friend
  const handleAddFriend = async () => {
    setIsSending(true);

    // send request
    const res = await axios.post(`/api/user/${profile.id}/add`)
      .then(() => {
        // toast success
        toast.success("Friend added!");
        // refresh page
        router.refresh();
      })
      .catch((err) => {
        // toast error
        toast.error(err.response.data.message);
      })
      .finally(() => {
        setIsSending(false);
      });
  };

  // remove friend
  const handleRemoveFriend = async () => {
    setIsSending(true);

    // send request
    const res = await axios.post(`/api/user/${profile.id}/remove`)
      .then(() => {
        // toast success
        toast.success("Friend removed");
        // refresh page
        router.refresh();
      })
      .catch((err) => {
        // toast error
        toast.error(err.response.data.message);
      })
      .finally(() => {
        setIsSending(false);
      });
  }

  // remove friend button text
  const [buttonText, setButtonText] = useState<string>("Friends");

  // change remove friend button text on hover
  const handleRemoveFriendButton = () => {
    if (buttonText === "Friends") {
      return setButtonText("Remove");
    }
    setButtonText("Friends");
  }

  return (
    <div className="flex flex-col h-screen">
      <Navbar />
      <div className="flex flex-row flex-1 overflow-hidden">
        <Sidebar profile />
        <div className="flex flex-col flex-1 overflow-y-auto">

          {/* upper */}
          <div className="z-10 bg-white border-b shadow-sm border-neutral-300">
            <div className="max-w-[1250px] mx-auto">
              {/* cover */}
              <div className="w-full bg-black h-[25vh] rounded-b-lg">a</div>
              {/* profile */}
              <div className="relative flex flex-col items-center justify-center gap-2 px-4 pb-4 md:flex-row md:justify-start">
                {/* avatar */}
                <div className="border-4 border-white w-[170px] rounded-full -top-[85px] absolute md:-top-[30px]">
                  <Avatar user={userAvatar} size={170} />
                </div>
                {/* name and friend count */}
                <div className="flex flex-col items-center gap-1 mt-[90px] md:mt-0 md:items-start md:ml-[184px] md:h-[136px] md:pt-4">
                  <div className="text-3xl font-bold">{profile.name}</div>
                  <div className="text-lg text-neutral-500">
                    {profile.friends.length} friends
                  </div>
                </div>
                
                {profile.id === user.id ? (
                  // edit profile button if on own profile page
                  <button className={`
                    flex flex-row items-center gap-2 px-4 py-2 transition duration-300
                    rounded bg-neutral-200 hover:bg-neutral-300 md:ml-auto md:mt-auto`}>
                    <MdModeEditOutline size={20} />
                    <div>Edit profile</div>
                  </button>
                ) : isFriend ? (
                  // remove friend button if user is friend
                  <button
                    disabled={isSending}
                    // change button text on hover in
                    onMouseEnter={handleRemoveFriendButton}
                    onMouseLeave={handleRemoveFriendButton}
                    onClick={handleRemoveFriend}
                    className={`
                    flex flex-row items-center gap-2 px-4 py-2 transition duration-300
                    rounded bg-[#35a420] hover:bg-red-600 text-white md:ml-auto md:mt-auto`}
                  >
                    <BsPersonCheckFill size={20} />
                    <div>{buttonText}</div>
                  </button>
                ) : (
                  // add friend button if user is not friend
                  <button
                    disabled={isSending}
                    onClick={handleAddFriend}
                    className={`
                    flex flex-row items-center gap-2 px-4 py-2 transition duration-300
                    rounded bg-[#1b74e4] text-white md:ml-auto md:mt-auto`}
                  >
                    <IoPersonAdd size={20} />
                    <div>Add Friend</div>
                  </button>
                )}

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
              <div className="flex-[.75] flex flex-col gap-4">
                <Intro profile={profile.profile!} />
                <Friends friends={profile.friends} />
              </div>

              {/* right */}
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
