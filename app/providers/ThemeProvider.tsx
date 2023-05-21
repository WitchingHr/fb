"use client";

import { Dispatch, SetStateAction, createContext, useState } from "react";

interface ThemeContextData {
  theme: string;
  setTheme: Dispatch<SetStateAction<string>>;
}

interface ThemeProviderProps {
  children: React.ReactNode;
}

// create context
export const ThemeContext = createContext<ThemeContextData>({} as ThemeContextData);

const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [theme, setTheme] = useState<string>("light");
  
  return (
    <ThemeContext.Provider value={{
      theme,
      setTheme
    }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
