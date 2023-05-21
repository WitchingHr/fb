"use client"

import { signOut } from "next-auth/react";
import { RiLogoutBoxRFill } from "react-icons/ri";
import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

import useUserMenuModal from "@/app/hooks/useUserMenuModal";
import { User } from "@/app/types";

// components
import Avatar from "../Avatar";
import { BsFillMoonFill, BsSunFill } from "react-icons/bs";
import useThemeModal from "@/app/hooks/useThemeModal";
import { MdAutorenew } from "react-icons/md";

// props
interface UserMenuProps {
  currentUser: User;
  isOpen: boolean;
}

// User Menu
// dropdown menu for user profile link and logout
const UserMenu: React.FC<UserMenuProps> = ({
  currentUser,
  isOpen
}) => {
  const router = useRouter();
  // user menu modal view state
  const userMenu = useUserMenuModal();

  // ref to menu
  const menuRef = useRef<HTMLUListElement>(null);

  // close menu when clicked outside
  useEffect(() => {
    if (isOpen) {
      const handleClickOutside = (event: MouseEvent) => {
        if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
          userMenu.onClose();
        }
      };
      document.addEventListener("click", handleClickOutside);
      return () => {
        document.removeEventListener("click", handleClickOutside);
      };
    }
  }, [isOpen, userMenu]);

  const handleGoToProfile = () => {
    userMenu.onClose();
    router.push(`/user/${currentUser.id}`);
  };

  // theme modal view state
  const themeModal = useThemeModal();

  // open theme modal after user menu closes
  const handleThemeModalOpen = () => {
    userMenu.onClose();
    themeModal.onOpen();
  };

  // get current theme
  const currentTheme = localStorage.getItem("theme");

  return (
    <>
      {isOpen && (
        <ul ref={menuRef} onClick={(e) => e.stopPropagation()}
          className={`absolute top-[48px] -right-4 sm:right-0 flex w-screen sm:w-[300px] border dark:border-[#393b3d] border-neutral-300
            flex-col gap-2 p-4 bg-white dark:bg-[#242526] md:rounded-md shadow-2xl text-black dark:text-[#e4e6eb]`}>
          <div onClick={handleGoToProfile} className="p-1 border rounded-md shadow-md border-neutral-300 dark:border-[#393b3d]">
            <div className={`flex flex-row items-center gap-2 p-3
              duration-300 rounded-md hover:bg-neutral-200 dark:hover:bg-[#3a3b3c]`}>
              <Avatar user={currentUser} size={36} />
              <div>{currentUser.name}</div>
            </div>
          </div>

          {/* logout */}
          <div
            onClick={() => signOut()}
            className="flex flex-row items-center gap-2 px-4 duration-300 rounded-md hover:bg-neutral-200 dark:hover:bg-[#3a3b3c]">
            <div className="flex flex-row items-center justify-center rounded-full w-9 h-9 bg-neutral-200 dark:bg-[#3a3b3c]">
              <RiLogoutBoxRFill size={24} />
            </div>
            <div>Log Out</div>
          </div>

          {/* theme */}
          <div
            onClick={handleThemeModalOpen}
            className="flex flex-row items-center gap-2 px-4 duration-300 rounded-md hover:bg-neutral-200 dark:hover:bg-[#3a3b3c]">
            <div className="flex flex-row items-center justify-center rounded-full w-9 h-9 bg-neutral-200 dark:bg-[#3a3b3c]">

              {/* update icon according to theme */}
              {currentTheme === "dark" ? (
                <BsFillMoonFill size={24} />
              ) : currentTheme === "light" ? (
                <BsSunFill size={24} />
              ) : (
                <MdAutorenew size={24} />
              )}
            </div>
            <div>Theme</div>
          </div>
        </ul>
      )}
    </>
  );
};

export default UserMenu;
