"use client"

import Link from "next/link";
import { useState } from "react";
import { MdHome } from "react-icons/md";

// components
import Avatar from "../Avatar";
import { User } from "@/app/types";

// props
interface SidebarProps {
  currentUser: User;
  profile?: boolean; // true if on profile page
}

// Sidebar
// links to home and profile pages
const Sidebar: React.FC<SidebarProps> = ({
  currentUser,
  profile = false,
}) => {
  // selected link, for displaying active link
  const [selected, setSelected] = useState<String>(profile ? 'User' : 'Home');

  return (
    <div className={`hidden sm:flex flex-col gap-2 px-2 py-4 lg:flex-1 max-w-[280px]
      bg-white lg:bg-transparent z-0 h-full border-neutral-300 border-r lg:border-r-0
      ${profile ? 'lg:!bg-white lg:!border-r lg:!flex-initial' : ''}`}
    >
      {/* home */}
      <Link href="/" onClick={() => setSelected('Home')}
        className={`relative flex flex-row items-center gap-2 p-2 rounded-md hover:bg-neutral-200
          duration-300 transition cursor-pointer
          ${selected === 'Home' ? 'sidebar-selected' : ''}
        `}
      >
        <MdHome size={26} className={`
          ${selected === 'Home' ? 'text-[#1a77f2]' : 'text-black'}
        `} />
        <div className={`
          hidden lg:block
          ${profile ? 'lg:!hidden' : ''}
        `}>Home</div>
      </Link>

      {/* user */}
      <Link href={`/user/${currentUser.id}`} onClick={() => setSelected('User')}
        className={`relative flex flex-row items-center gap-2 p-2 rounded-md hover:bg-neutral-200
          duration-300 transition cursor-pointer
          ${selected === 'User' ? 'sidebar-selected' : ''}
        `}
      >
        <Avatar user={currentUser} size={26} />
        <div className={`hidden lg:block
          ${profile ? 'lg:!hidden' : ''}
        `}>{currentUser.name}</div>
      </Link>

      <hr className="border-neutral-300" />
      
    </div>
  );
};

export default Sidebar;
