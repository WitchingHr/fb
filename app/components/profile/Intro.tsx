"use client"

import { Profile } from "@prisma/client";
import { MdHome, MdOutlineWork } from "react-icons/md";
import { IoSchool } from "react-icons/io5";
import { BsFillPersonLinesFill } from "react-icons/bs";

interface IntroProps {
  profile: Profile;
}

const Intro: React.FC<IntroProps> = ({
  profile,
}) => {
  return (
    <div className="flex flex-col gap-2 p-4 bg-white dark:bg-[#242526] border dark:border-0 rounded-md shadow-sm border-neutral-300">
      <h1 className="text-2xl font-semibold text-black dark:text-[#e4e6eb]">Intro</h1>
      <div className="flex gap-2">
        <MdHome size={20} className="text-neutral-500 dark:text-neutral-400 min-w-[20px]" />
        <div className="font-light text-black dark:text-[#e4e6eb]">
          Lives in
          <span className="font-medium"> {profile.location}</span>
        </div>
      </div>

      <div className="flex gap-2">
        <MdOutlineWork size={20} className="text-neutral-500 dark:text-neutral-400 min-w-[20px]" />
        <div className="font-light text-black dark:text-[#e4e6eb]">
          Works as
          <span className="font-medium"> {profile.job}</span>
        </div>
      </div>

      <div className="flex gap-2">
        <IoSchool size={20} className="text-neutral-500 dark:text-neutral-400 min-w-[20px]" />
        <div className="font-light text-black dark:text-[#e4e6eb]">
          Went to school at
          <span className="font-medium"> {profile.education}</span>
        </div>
      </div>

      <div className="flex gap-2">
        <BsFillPersonLinesFill size={20} className="text-neutral-500 dark:text-neutral-400 min-w-[20px]" />
        <div className="font-light text-black dark:text-[#e4e6eb]">
          {profile.bio}
        </div>
      </div>

    </div>
  );
};

export default Intro;
