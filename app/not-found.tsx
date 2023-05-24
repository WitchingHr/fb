"use client"

import Link from "next/link";
import { useEffect } from "react";

import setTheme from "@/app/lib/theme";

// 404 page
const NotFound = () => {
  useEffect(() => {
    setTheme();
  }, []);
  return (
    <div className="relative w-screen h-screen">
      <div
        className="absolute top-[20%] left-0 right-0
        flex flex-col items-center justify-center
        text-neutral-500 dark:text-neutral-400"
      >
        <h1 className="text-4xl">404</h1>
        <p className="text-xl">Oops, Page not found</p>
      
        <Link
          href={"/"}
          className="px-4 py-2 mt-20 text-white dark:text-[#18191a]
          bg-[#1a77f2] rounded hover:bg-[#1668d4]"
        >
          Go back home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
