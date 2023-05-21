"use client"

interface ProfileNavbarProps {
  selected: string;
  setSelected: React.Dispatch<React.SetStateAction<string>>;
}

const ProfileNavbar: React.FC<ProfileNavbarProps> = ({
  selected,
  setSelected,
}) => {
  return (
    <ul className="flex flex-row justify-around w-full md:justify-start md:gap-4 text-neutral-500 dark:text-neutral-400">
      <li
        className={`p-4 cursor-pointer
          ${selected === "Posts"
            ? "text-[#1a77f2] profile-selected relative"
            : "text-neutral-500 dark:text-neutral-400"}
            hover:bg-neutral-200 dark:hover:bg-[#3a3b3c] rounded-md duration-300 transition`}
        onClick={() => setSelected("Posts")}
      >
        Posts
      </li>
      <li
        className={`p-4 cursor-pointer ${selected === "About"
        ? "text-[#1a77f2] profile-selected relative"
        : "text-neutral-500 dark:text-neutral-400"}
        hover:bg-neutral-200 dark:hover:bg-[#3a3b3c] rounded-md duration-300 transition`}
    onClick={() => setSelected("About")}
      >
        About
      </li>
      <li
        className={`p-4 cursor-pointer ${selected === "Friends"
        ? "text-[#1a77f2] profile-selected relative"
        : "text-neutral-500 dark:text-neutral-400"}
        hover:bg-neutral-200 dark:hover:bg-[#3a3b3c] rounded-md duration-300 transition`}
    onClick={() => setSelected("Friends")}
      >
        Friends
      </li>
      <li
        className={`p-4 cursor-pointer ${selected === "Photos"
        ? "text-[#1a77f2] profile-selected relative"
        : "text-neutral-500 dark:text-neutral-400"}
        hover:bg-neutral-200 dark:hover:bg-[#3a3b3c] rounded-md duration-300 transition`}
    onClick={() => setSelected("Photos")}
      >
        Photos
      </li>
    </ul>
  );
};

export default ProfileNavbar;
