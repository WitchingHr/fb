"use client"

import Link from "next/link";
import { ImSearch } from "react-icons/im";
import { IoMdNotifications } from "react-icons/io";
import { useContext } from "react";

import { UserContext } from "@/app/providers/UserProvider";
import useUserMenuModal from "@/app/hooks/useUserMenuModal";

// components
import Avatar from "../Avatar";
import UserMenu from "../menus/UserMenu";

// Navbar
// displays logo, search bar, notifications, and profile picture
const Navbar = () => {
  // get user
  const { user } = useContext(UserContext);

  // user menu modal view state
  const userMenu = useUserMenuModal();

  // open/close user menu
  const handleMenu = () => {
    if (userMenu.isOpen) {
      userMenu.onClose();
    } else {
      userMenu.onOpen();
    }
  };

  return (
    <div className="z-40 flex flex-row px-4 py-2 bg-white dark:bg-[#242526] border-b shadow-sm lg:lg-layout-grid border-neutral-300 dark:border-[#393b3d]">
      <Link href="/">
        <h1 className="text-3xl font-bold text-[#1a77f2]">facebook</h1>
      </Link>

      <div className="flex flex-row items-center md:flex-1 gap-2 max-w-[680px] max-h-[40px]
        p-3 font-light rounded-full bg-neutral-100 dark:bg-[#3a3b3c] dark:text-neutral-400 text-neutral-500 mx-4
        hover:bg-neutral-200 dark:hover:bg-[#4e4f50] duration-300 transition cursor-pointer"
      >
        <ImSearch size={16} />
        <div className="hidden md:block">Search Facebook</div>
      </div>

      <div className="flex flex-row items-center gap-2 ml-auto">
        <div className="flex items-center justify-center w-10 h-10 rounded-full bg-neutral-200 dark:bg-[#3a3b3c] text-black dark:text-[#e4e6eb]">
          <IoMdNotifications size={26} />
        </div>
        <button onClick={handleMenu} className="relative">
          <Avatar user={user} size={40} />
          <UserMenu currentUser={user} isOpen={userMenu.isOpen} />
        </button>
      </div>
    </div>
  );
};

export default Navbar;
