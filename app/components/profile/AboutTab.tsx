"use client"

interface AboutTabProps {
  name: string;
  selected: string;
  setSelected: React.Dispatch<React.SetStateAction<string>>;
}

// AboutTab
// tab for About component, sets selected tab
const AboutTab: React.FC<AboutTabProps> = ({
  name,
  selected,
  setSelected,
}) => {
  const handleClick = () => {
    setSelected(name);
  };

  return (
    <button
      onClick={handleClick}
      className={`
        px-2 py-1 rounded-md text-left dark:text-neutral-400
        ${selected === name ? (
          "bg-[#e7f3ff] dark:bg-[#263951] !text-[#1A77F2] "
        ) : (
          "hover:bg-[#f0f2f5] dark:hover:bg-[#3a3b3c]"
        )}
      `}
    >
      {name}
    </button>
  );
};

export default AboutTab;
