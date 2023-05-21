"use client"

import Link from "next/link";
import { useContext, useState } from "react";
import { MdHome } from "react-icons/md";

import { UserContext } from "@/app/providers/UserProvider";

// components
import Avatar from "../Avatar";

// props
interface SidebarProps {
  profile?: boolean; // true if on profile page
}

// Sidebar
// links to home and profile pages
const Sidebar: React.FC<SidebarProps> = ({
  profile = false,
}) => {
  // get user
  const { user } = useContext(UserContext);

  // selected link, for displaying active link
  const [selected, setSelected] = useState<String>(profile ? 'User' : 'Home');

  return (
    <div className={`hidden sm:flex flex-col gap-2 px-2 py-4 max-w-[280px]
      bg-white dark:bg-[#242526] z-0 h-full border-neutral-300 dark:border-[#393b3d] border-r lg:border-r-0
      ${!profile && ('lg:bg-transparent')}
      ${profile ? 'bg-white dark:bg-[#242526] lg:!border-r lg:!flex-initial' : ''}`}
    >
      {/* home */}
      <Link href="/" onClick={() => setSelected('Home')}
        className={`relative flex flex-row items-center gap-2 p-2 rounded-md hover:bg-neutral-200
          dark:hover:bg-[#3a3b3c] duration-300 transition cursor-pointer
          ${selected === 'Home' ? 'sidebar-selected' : ''}
        `}
      >
        <MdHome size={26} className={`
          ${selected === 'Home' ? 'text-[#1a77f2]' : 'text-black dark:text-[#e4e6eb]'}
        `} />
        <div className={`
          hidden lg:block dark:text-neutral-400
          ${profile ? 'lg:!hidden' : ''}
        `}>Home</div>
      </Link>

      {/* user */}
      <Link href={`/user/${user.id}`} onClick={() => setSelected('User')}
        className={`relative flex flex-row items-center gap-2 p-2 rounded-md hover:bg-neutral-200
          dark:hover:bg-[#3a3b3c] duration-300 transition cursor-pointer
          ${selected === 'User' ? 'sidebar-selected' : ''}
        `}
      >
        <Avatar user={user} size={26} />
        <div className={`hidden lg:block whitespace-nowrap dark:text-neutral-400
          ${profile ? 'lg:!hidden' : ''}
        `}>{user.name}</div>
      </Link>

      <hr className="border-neutral-300 dark:border-[#393a3b]" />
      
    </div>
  );
};

export default Sidebar;
