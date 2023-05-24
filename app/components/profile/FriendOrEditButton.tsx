"use client"

import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { MdModeEditOutline } from "react-icons/md";
import { BsPersonCheckFill, BsPersonDashFill, BsPersonPlusFill } from "react-icons/bs";

import { UserContext } from "@/app/providers/UserProvider";
import { UserProfile } from "@/app/types";
import useProfileModal from "@/app/hooks/useProfileModal";

// props
interface FriendOrEditButtonProps {
  profile: UserProfile;
  isFriend: boolean;
}

// Friend Or Edit Button
// button to add or remove friend if on another user's profile page
// or edit profile if on own profile page
const FriendOrEditButton: React.FC<FriendOrEditButtonProps> = ({
  profile,
  isFriend,
}) => {
  // user
  const { user } = useContext(UserContext);

  // state for mobile
  const [isMobile, setIsMobile] = useState<boolean>(false);

  // check if mobile, set state on mount and on resize
  useEffect(() => {
    if (window.innerWidth < 768) {
      setIsMobile(true);
    }

    // handle resize
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setIsMobile(true);
      } else {
        setIsMobile(false);
      }
    }

    // add event listener
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    }
  }, []);

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
      .catch(() => {
        // toast error
        toast.error("Error adding friend");
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

  // profile modal view state, for editing profile
  const profileModal = useProfileModal();

  return (
    <div className="flex gap-2 md:ml-auto md:mt-auto">
      {profile.id === user.id ? (
        // edit profile button if on own profile page
        <button
          onClick={profileModal.onOpen}
          className="flex flex-row items-center gap-2 px-4 py-2
          md:ml-auto md:mt-auto rounded
          text-black dark:text-[#e4e6eb]
          bg-neutral-200 dark:bg-[#3a3b3c]
          duration-300 hover:bg-neutral-300 dark:hover:bg-[#4e4f50]"
        >
          {/* icon */}
          <MdModeEditOutline size={20} />
          <div>Edit profile</div>
        </button>
      ) : isFriend ? (

        // ON MOBILE: show two buttons, friends and remove friend
        isMobile ? (
          <>
            {/* friends */}
            <button
              disabled={true}
              // change button text on hover in
              className="flex flex-row items-center gap-2 px-4 py-2
              text-white bg-[#35a420] rounded cursor-not-allowed"
            >
              {/* icon */}
              <BsPersonCheckFill size={20} />
              <div>{buttonText}</div>
            </button>

            {/* remove friend */}
            <button
              disabled={isSending}
              onClick={handleRemoveFriend}
              className="flex flex-row items-center gap-2 px-4 py-2
            bg-neutral-500 dark:bg-[#3a3b3c] text-white
            dark:hover:bg-[#4e4f50] rounded"
            >
              {/* icon */}
              <BsPersonDashFill size={20} />
              <div>Remove</div>
            </button>
          </>
        ) : (

          // NOT ON MOBILE: dynamically show friends or remove friend button
          <button
            disabled={isSending}
            // change button text on hover in
            onMouseEnter={handleRemoveFriendButton}
            onMouseLeave={handleRemoveFriendButton}
            onClick={handleRemoveFriend}
            className="flex flex-row items-center gap-2 w-[120px]
            px-4 py-2 bg-[#35a420] text-white 
            duration-300 hover:bg-red-600 rounded"
          >
            {buttonText === "Friends" ? (
              <BsPersonCheckFill size={20} />
            ) : (
              <BsPersonDashFill size={20} />
            )}
            <div>{buttonText}</div>
          </button>
        )
      ) : (

        // add friend button if user is not friend
        <button
          disabled={isSending}
          onClick={handleAddFriend}
          className="flex flex-row items-center gap-2 px-4 py-2
          text-white bg-[#1b74e4]
          duration-300 hover:bg-[#1663c2] rounded"
        >
          {/* icon */}
          <BsPersonPlusFill size={20} />
          <div>Add Friend</div>
        </button>
      )}
    </div>
  );
};

export default FriendOrEditButton;
