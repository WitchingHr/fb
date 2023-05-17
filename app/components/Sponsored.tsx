"use client"

import Image from "next/image";

// Sponsored
// sponsored content, contains links to my sites
const Sponsored = () => {
  return (
    <>
      <div className="pl-2">Sponsored</div>
      <a
        href="https://witchinghr.dev"
        target="_blank"
        className="flex flex-row items-center gap-2 p-2 transition duration-300 rounded-md hover:bg-neutral-200"
      >
        <Image
          alt="portfolio"
          src="/images/placeholder.jpg"
          width={90} height={90}
          className="aspect-square" />
        <div>
          <div>Portfolio</div>
          <div className="text-sm font-light text-neutral-500">witchinghr.dev</div>
        </div>
      </a>
    </>
  );
};

export default Sponsored;
