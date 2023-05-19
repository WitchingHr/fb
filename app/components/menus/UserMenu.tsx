"use client"

import { signOut } from "next-auth/react";
import { RiLogoutBoxRFill } from "react-icons/ri";
import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

import useUserMenuModal from "@/app/hooks/useUserMenuModal";
import { User } from "@/app/types";

// components
import Avatar from "../Avatar";

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

  return (
    <>
      {isOpen && (
        <ul ref={menuRef} onClick={(e) => e.stopPropagation()} className="absolute top-[55px] right-0 flex w-[300px] flex-col gap-2 p-4 bg-white rounded-md shadow-lg">
          <div onClick={handleGoToProfile} className="p-1 border rounded-md shadow-md border-neutral-300">
            <div className="flex flex-row items-center gap-2 p-3 transition duration-300 rounded-md hover:bg-neutral-200">
              <Avatar user={currentUser} size={36} />
              <div>{currentUser.name}</div>
            </div>
          </div>
          <div
            onClick={() => signOut()}
            className="flex flex-row items-center gap-2 transition duration-300 rounded-md hover:bg-neutral-200">
            <div className="flex flex-row items-center justify-center rounded-full w-9 h-9 bg-neutral-200">
              <RiLogoutBoxRFill size={24} />
            </div>
            <div>Log Out</div>
          </div>
        </ul>
      )}
    </>
  );
};

export default UserMenu;
