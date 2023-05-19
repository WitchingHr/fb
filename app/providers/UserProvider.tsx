"use client";

import { Dispatch, SetStateAction, createContext, useState } from "react";
import { User } from "../types";

interface UserContextData {
  user: User;
  setUser: Dispatch<SetStateAction<User>>;
}

interface UserProviderProps {
  children: React.ReactNode;
}

// create context
export const UserContext = createContext<UserContextData>({} as UserContextData);

const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User>({
    id: "",
    name: "",
    image: "",
  });
  
  return (
    <UserContext.Provider value={{
      user,
      setUser
    }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
