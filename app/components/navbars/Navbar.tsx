"use client"

import Link from "next/link";
import { ImSearch } from "react-icons/im";
import { IoMdNotifications } from "react-icons/io";
import { Profile, User } from "@prisma/client";

import Avatar from "../Avatar";

// props
interface NavbarProps {
  currentUser: User & {
    profile: Profile | null;
  };
}

// Navbar
// displays logo, search bar, notifications, and profile picture
const Navbar: React.FC<NavbarProps> = ({
  currentUser,
}) => {
  return (
    <div className="z-10 flex flex-row items-center px-4 py-2 bg-white border-b shadow-sm md:justify-between border-neutral-300">
      <Link href="/">
        <h1 className="text-3xl font-bold text-[#1a77f2]">facebook</h1>
      </Link>
      <div className="flex flex-row items-center md:flex-1 gap-2 max-w-[680px]
        p-3 font-light rounded-full bg-neutral-100 text-neutral-500 mr-auto md:mr-2 mx-2
        hover:bg-neutral-200 duration-300 transition cursor-pointer"
      >
        <ImSearch size={16} />
        <div className="hidden md:block">Search Facebook</div>
      </div>
      <div className="flex flex-row items-center gap-2">
        <div className="flex items-center justify-center w-10 h-10 rounded-full bg-neutral-200">
          <IoMdNotifications size={26} />
        </div>
        <Avatar currentUser={currentUser} size={40} />
      </div>
    </div>
  );
};

export default Navbar;
