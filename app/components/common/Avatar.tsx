"use client"

import Link from "next/link";
import Image from "next/image";

import { User } from "@/app/types/";

// props
interface AvatarProps {
  user: User;
  size: number;
  button?: boolean;
}

// Avatar
// displays user profile picture, or placeholder if none
// if button prop is true, avatar is a link to user's profile
const Avatar: React.FC<AvatarProps> = ({
  user,
  size,
  button = false
}) => {
  return (
    <>
      {button ? (
        <Link href={`/user/${user.id}`}>
          <Image
            src={user.image || '/images/placeholder.jpg'}
            alt="profile picture"
            className="object-cover rounded-full aspect-square"
            width={size}
            height={size}
          />
        </Link>
      ) : (
        <Image
          src={user.image || '/images/placeholder.jpg'}
          alt="profile picture"
          className="object-cover rounded-full aspect-square"
          width={size}
          height={size}
        />
      )}
    </>
  );
};

export default Avatar;
