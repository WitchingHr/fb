"use client"

import { useState } from "react";
import { MdModeEditOutline } from "react-icons/md";
import { BsPersonCheckFill } from "react-icons/bs";
import { IoPersonAdd } from "react-icons/io5";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

import { User, UserProfile } from "@/app/types";

// props
interface FriendOrEditButtonProps {
  profile: UserProfile;
  user: User;
  isFriend: boolean;
}

// Friend Or Edit Button
// button to add or remove friend if on another user's profile page
// or edit profile if on own profile page
const FriendOrEditButton: React.FC<FriendOrEditButtonProps> = ({
  profile,
  user,
  isFriend,
}) => {
  // router
  const router = useRouter();

  // remove friend button text
  const [buttonText, setButtonText] = useState<string>("Friends");

  // change remove friend button text on hover
  const handleRemoveFriendButton = () => {
    if (buttonText === "Friends") {
      return setButtonText("Remove");
    }
    setButtonText("Friends");
  }

  // disable add friend button while sending request
  const [isSending, setIsSending] = useState<boolean>(false);

  // add friend
  const handleAddFriend = async () => {
    setIsSending(true);

    // send request
    await axios.post(`/api/user/${profile.id}/add`)
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
    await axios.post(`/api/user/${profile.id}/remove`)
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

  return (
    <>
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
      
    </>
  );
};

export default FriendOrEditButton;
