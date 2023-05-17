"use client"

import { Profile, User } from "@prisma/client";
import { useState } from "react";
import { MdHome } from "react-icons/md";

import Avatar from "../Avatar";


// props
interface SidebarProps {
  currentUser: User & {
    profile: Profile | null;
  };
}

// TODO: add links to home and profile pages

// Sidebar
// links to home and profile pages
// collapses on mobile
const Sidebar: React.FC<SidebarProps> = ({
  currentUser,
}) => {
  // selected link, for displaying active link
  const [selected, setSelected] = useState<String>('Home');

  return (
    <div className={`hidden sm:flex flex-col gap-2 px-2 py-4 lg:flex-1 max-w-[280px]
      bg-white lg:bg-transparent z-0 h-full border-neutral-300 border-r lg:border-r-0`}
    >
      {/* home */}
      <button onClick={() => setSelected('Home')}
        className={`relative flex flex-row items-center gap-2 p-2 rounded-md hover:bg-neutral-200
          duration-300 transition cursor-pointer
          ${selected === 'Home' ? 'sidebar-selected' : ''}
        `}
      >
        <MdHome size={26} className={`
          ${selected === 'Home' ? 'text-[#1a77f2]' : 'text-black'}
        `} />
        <div className="hidden lg:block">Home</div>
      </button>

      {/* user */}
      <button onClick={() => setSelected('User')}
        className={`relative flex flex-row items-center gap-2 p-2 rounded-md hover:bg-neutral-200
          duration-300 transition cursor-pointer
          ${selected === 'User' ? 'sidebar-selected' : ''}
        `}
      >
        <Avatar currentUser={currentUser} size={26} />
        <div className="hidden lg:block">{currentUser.name}</div>
      </button>

      <hr className="border-neutral-300" />
      
    </div>
  );
};

export default Sidebar;
