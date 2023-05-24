"use client"

import { useState } from "react";
import { MdEdit, MdHome, MdOutlineWork } from "react-icons/md";
import { IoSchool } from "react-icons/io5";
import { BsFillPersonLinesFill } from "react-icons/bs";

import { UserProfile } from "@/app/types";
import useProfileModal from "@/app/hooks/useProfileModal";
import AboutTab from "./AboutTab";
import UserInfo from "./UserInfo";

// props
interface AboutProps {
  profile: UserProfile;
}

// About
// shows user's profile information
const About: React.FC<AboutProps> = ({
  profile,
}) => {
  // destructure data from profile
  const { location, job, education, bio } = profile.profile!;

  // selected tab
  const [selected, setSelected] = useState<string>("Overview");

  // profile modal view state (for editing profile)
  const profileModal = useProfileModal();

  return (
    <div
      className="flex flex-col gap-2 w-full
      bg-white dark:bg-[#242526]
      border dark:border-0 border-neutral-300
      shadow-sm rounded-md"
    >
      <div className="flex flex-col md:flex-row">

        {/* tabs, left */}
        <div
          className="flex flex-col lg:w-[360px] px-2 py-4
          border border-white dark:border-[#242526]
           md:border-b-0 border-b-neutral-300 dark:border-b-[#393b3d]
          md:border-r-neutral-300 md:dark:border-r-[#393b3d] 
          rounded-md rounded-b-none md:rounded-r-none md:rounded-l-md"
        >
          {/* heading */}
          <h1
            className="pb-2 ml-2 text-2xl font-semibold text-black dark:text-[#e4e6eb]"
          >
            About
          </h1>

          {/* Tabs */}
          <div className="flex flex-col gap-2">
            <AboutTab
              name="Overview"
              selected={selected}
              setSelected={setSelected}
            />
            <AboutTab
              name="Work and education"
              selected={selected}
              setSelected={setSelected}
            />
            <AboutTab
              name="Places lived"
              selected={selected}
              setSelected={setSelected}
            />
            <AboutTab
              name="Details about you"
              selected={selected}
              setSelected={setSelected}
            />
          </div>
        </div>

        {/* info, right */}
        <div className="flex flex-row flex-1">
          <div className="flex flex-col flex-1 gap-4 p-4 md:mt-12">
            {(selected === "Overview" || selected === "Places lived") && (
              <UserInfo
                label="Lives in"
                value={location}
              >
                <MdHome size={20} />
              </UserInfo>
            )}

            {(selected === "Overview" || selected === "Work and education") && (
              <UserInfo
                label="Works as"
                value={job}
              >
                <MdOutlineWork size={20} />
              </UserInfo>
            )}

            {(selected === "Overview" || selected === "Work and education") && (
              <UserInfo
                label="Studied at"
                value={education}
              >
                <IoSchool size={20} />
              </UserInfo>
            )}


            {(selected === "Overview" || selected === "Details about you") && (
              <UserInfo
                value={bio}
                bio
              >
                <BsFillPersonLinesFill size={20} />
              </UserInfo>
            )}
            
          </div>
          <div className="p-4">

            {/* edit button, opens profile edit modal */}
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
