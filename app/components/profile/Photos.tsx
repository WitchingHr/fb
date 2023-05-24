"use client"

import Image from "next/image";

import { UserProfile } from "@/app/types";

// props
interface PhotosProps {
  profile: UserProfile;
}

// Photos
// displays user's photos in a grid
const Photos: React.FC<PhotosProps> = ({
  profile,
}) => {
  // get photos and reverse them so the most recent is first
  const photos = profile.profile?.photos.reverse();

  return (
    <div
      className="flex flex-col gap-2 p-4 w-full
      bg-white dark:bg-[#242526]
      border dark:border-0 border-neutral-300
      rounded-md shadow-sm"
    >
      <h1
        className="text-2xl font-semibold
        text-black dark:text-[#e4e6eb]"
      >
        Photos
      </h1>

      <div
        className="grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
      >
        {photos?.map((photo) => (
          // render each photo
          <div
            key={photo}
            className="relative w-full overflow-hidden rounded-md aspect-square"
          >
            <Image
              alt="photo"
              src={photo}
              fill
              className="object-cover duration-300 hover:scale-110"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Photos;
