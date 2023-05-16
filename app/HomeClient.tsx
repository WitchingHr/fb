"use client"

import { User } from "@prisma/client";

interface HomeClientProps {
  currentUser: User;
}

const HomeClient: React.FC<HomeClientProps> = ({
  currentUser,
}) => {
  return (
    <div>
      {currentUser.name}
    </div>
  );
};

export default HomeClient;
