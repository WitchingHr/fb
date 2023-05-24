"use client"

import ProfileNavbarTab from "./ProfileNavbarTab";

// props
interface ProfileNavbarProps {
  selected: string;
  setSelected: React.Dispatch<React.SetStateAction<string>>;
}

// ProfileNavbar
// navigation tabs for posts, about, friends, and photos
const ProfileNavbar: React.FC<ProfileNavbarProps> = ({
  selected,
  setSelected,
}) => {
  return (
    <ul className="flex flex-row justify-around w-full md:justify-start md:gap-4 text-neutral-500 dark:text-neutral-400">
      <ProfileNavbarTab
        name="Posts"
        selected={selected}
        setSelected={setSelected}
      />
      <ProfileNavbarTab
        name="About"
        selected={selected}
        setSelected={setSelected}
      />
      <ProfileNavbarTab
        name="Friends"
        selected={selected}
        setSelected={setSelected}
      />
      <ProfileNavbarTab
        name="Photos"
        selected={selected}
        setSelected={setSelected}
      />
    </ul>
  );
};

export default ProfileNavbar;
