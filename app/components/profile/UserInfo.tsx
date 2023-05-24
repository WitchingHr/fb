"use client"

interface UserInfoProps {
  label?: string;
  value: string | null;
  bio?: boolean;
  children: React.ReactNode;
}

// UserInfo
// shows user's profile information
const UserInfo: React.FC<UserInfoProps> = ({
  label,
  value,
  bio,
  children,
}) => {
  return (
    <div className="flex gap-2">
      <div className="text-neutral-500 dark:text-neutral-400 min-w-[20px]">
        {children}
      </div>
      <div className="font-light text-black dark:text-[#e4e6eb]">
        {label && (
          <span>{label}{" "}</span>
        )}
        <span className={!bio ? "font-medium" : ""}>{value}</span>
      </div>
    </div>
  );
};

export default UserInfo;
