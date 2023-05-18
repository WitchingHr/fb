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
    <div className="flex flex-col gap-2 p-4 bg-white rounded-md shadow-sm">
      <h1 className="text-2xl font-semibold">Intro</h1>
      <div className="flex gap-2">
        <MdHome size={20} className="text-neutral-500" />
        <div className="font-light">
          Lives in
          <span className="font-medium"> {profile.location}</span>
        </div>
      </div>

      <div className="flex gap-2">
        <MdOutlineWork size={20} className="text-neutral-500" />
        <div className="font-light">
          Works as
          <span className="font-medium"> {profile.job}</span>
        </div>
      </div>

      <div className="flex gap-2">
        <IoSchool size={20} className="text-neutral-500" />
        <div className="font-light">
          Went to school at
          <span className="font-medium"> {profile.education}</span>
        </div>
      </div>

      <div className="flex gap-2">
        <BsFillPersonLinesFill size={20} className="text-neutral-500" />
        <div className="font-light">
          {profile.bio}
        </div>
      </div>

    </div>
  );
};

export default Intro;
