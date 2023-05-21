"use client"

import { MdEdit, MdHome, MdOutlineWork } from "react-icons/md";
import { IoSchool } from "react-icons/io5";
import { BsFillPersonLinesFill } from "react-icons/bs";
import { UserProfile } from "@/app/types";
import { useState } from "react";
import useProfileModal from "@/app/hooks/useProfileModal";

interface AboutProps {
  profile: UserProfile;
}

const About: React.FC<AboutProps> = ({
  profile,
}) => {
  const { location, job, education, bio } = profile.profile!;

  const [selected, setSelected] = useState<string>("Overview");

  // profile modal
  const profileModal = useProfileModal();

  return (
    <div className="flex flex-col w-full gap-2 bg-white dark:bg-[#242526] border dark:border-0 rounded-md shadow-sm border-neutral-300">

      {/* container */}
      <div className="flex flex-col md:flex-row">

        {/* left */}
        <div className="flex flex-col px-2 py-4 border border-white lg:w-[360px]
          dark:border-[#242526] border-b-neutral-300 md:border-r-neutral-300
          md:dark:border-r-[#393b3d] dark:border-b-[#393b3d] md:border-b-0
          rounded-md rounded-b-none md:rounded-l-md md:rounded-r-none"
        >
          {/* heading */}
          <h1 className="pb-2 ml-2 text-2xl font-semibold text-black dark:text-[#e4e6eb]">About</h1>

          <div className="flex flex-col gap-2">
            <button
              onClick={() => setSelected("Overview")}
              className={`px-2 py-1 rounded-md text-left dark:text-neutral-400
              ${selected === "Overview" ? "bg-[#e7f3ff] !text-[#1A77F2] dark:bg-[#263951]" : "hover:bg-[#f0f2f5] dark:hover:bg-[#3a3b3c]"}`}
            >
              Overview
            </button>
            <button
              onClick={() => setSelected("Work and education")}
              className={`px-2 py-1 rounded-md text-left dark:text-neutral-400
              ${selected === "Work and education" ? "bg-[#e7f3ff] !text-[#1A77F2] dark:bg-[#263951]" : "hover:bg-[#f0f2f5] dark:hover:bg-[#3a3b3c]"}`}
            >
              Work and education
            </button>
          </div>

        </div>

        {/* right */}
        <div className="flex flex-row flex-1">
          <div className="flex flex-col flex-1 gap-4 p-4">
            <div className="flex gap-2">
              <MdHome size={20} className="text-neutral-500 dark:text-neutral-400 min-w-[20px]" />
              <div className="font-light text-black dark:text-[#e4e6eb]">
                Lives in
                <span className="font-medium"> {location}</span>
              </div>
            </div>
            <div className="flex gap-2">
              <MdOutlineWork size={20} className="text-neutral-500 dark:text-neutral-400 min-w-[20px]" />
              <div className="font-light text-black dark:text-[#e4e6eb]">
                Works as
                <span className="font-medium"> {job}</span>
              </div>
            </div>
            <div className="flex gap-2">
              <IoSchool size={20} className="text-neutral-500 dark:text-neutral-400 min-w-[20px]" />
              <div className="font-light text-black dark:text-[#e4e6eb]">
                Went to school at
                <span className="font-medium"> {education}</span>
              </div>
            </div>
            <div className="flex gap-2">
              <BsFillPersonLinesFill size={20} className="text-neutral-500 dark:text-neutral-400 min-w-[20px]" />
              <div className="font-light text-black dark:text-[#e4e6eb]">
                {bio}
              </div>
            </div>
          </div>
          <div className="p-4">
            <button
              onClick={profileModal.onOpen}
            >
              <MdEdit size={20} className="text-neutral-500 dark:text-neutral-400" />
            </button>
          </div>
        </div>
      </div>

    </div>
  );
};

export default About;
