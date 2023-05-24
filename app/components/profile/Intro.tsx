"use client"

import { MdHome, MdOutlineWork } from "react-icons/md";
import { IoSchool } from "react-icons/io5";
import { BsFillPersonLinesFill } from "react-icons/bs";

import { Profile } from "@prisma/client";
import UserInfo from "./UserInfo";

// props
interface IntroProps {
  profile: Profile;
}

// Intro
// displays user's location, job, education, and bio
const Intro: React.FC<IntroProps> = ({
  profile,
}) => {
  return (
    <div
      className="flex flex-col gap-2 p-4 rounded-md
      bg-white dark:bg-[#242526] shadow-sm
      border dark:border-0 border-neutral-300"
    >
      <h1
        className="text-2xl font-semibold
        text-black dark:text-[#e4e6eb]"
      >
        Intro
      </h1>
      <UserInfo
        label="Lives in"
        value={profile.location}
      >
        <MdHome size={20} />
      </UserInfo>
      <UserInfo
        label="Works as"
        value={profile.job}
      >
        <MdOutlineWork size={20} />
      </UserInfo>
      <UserInfo
        label="Studied at"
        value={profile.education}
      >
        <IoSchool size={20} />
      </UserInfo>
      <UserInfo
        value={profile.bio}
        bio
      >
        <BsFillPersonLinesFill size={20} />
      </UserInfo>
    </div>
  );
};

export default Intro;
