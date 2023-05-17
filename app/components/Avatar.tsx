"use client"

import { Profile } from "@prisma/client";
import Image from "next/image";
import { SafeUser } from "../types/types";

// props
interface AvatarProps {
  currentUser: SafeUser & {
    profile: Profile | null;
  };
  size: number
}

// Avatar
// displays user profile picture, or placeholder if none
const Avatar: React.FC<AvatarProps> = ({
  currentUser,
  size
}) => {
  return (
    <Image
      src={currentUser.profile?.image || '/images/placeholder.jpg'}
      alt="profile picture"
      className="object-cover rounded-full aspect-square"
      width={size}
      height={size}
    />
  );
};

export default Avatar;
