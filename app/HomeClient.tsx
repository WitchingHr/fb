"use client"

import { Profile, User } from "@prisma/client";

// components
import ProfileCreator from "./ProfileCreator";

// props
interface HomeClientProps {
  currentUser: User & {
    profile: Profile | null;
  };
}

// Home Client
// home page for client
const HomeClient: React.FC<HomeClientProps> = ({
  currentUser,
}) => {
  // if user has no profile, show profile creator
  if (!currentUser.profile) {
    return <ProfileCreator currentUser={currentUser} />;
  }

  return (
    <div>
      {currentUser.name}
    </div>
  );
};

export default HomeClient;
