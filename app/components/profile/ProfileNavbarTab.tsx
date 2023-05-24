"use client"

// props
interface ProfileNavbarTabsProps {
  name: string;
  selected: string;
  setSelected: React.Dispatch<React.SetStateAction<string>>;
}

// ProfileNavbarTab
// individual tab for ProfileNavbar
const ProfileNavbarTab: React.FC<ProfileNavbarTabsProps> = ({
  name,
  selected,
  setSelected,
}) => {
  // set selected tab
  const handleClick = () => {
    setSelected(name);
  };

  return (
    <li
      role="tab"
      className={`
        p-4 rounded-md cursor-pointer
        ${selected === name
          ? "text-[#1a77f2] profile-selected relative"
          : "text-neutral-500 dark:text-neutral-400"
        }
        duration-300 hover:bg-neutral-200 dark:hover:bg-[#3a3b3c]
      `}
      onClick={handleClick}
    >
      {name}
    </li>
  );
};

export default ProfileNavbarTab;
