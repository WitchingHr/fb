"use client"

import Image from "next/image";

// Sponsored
// sponsored content, contains links to my sites
const Sponsored = () => {
  return (
    <div className="flex-col hidden py-4 pr-4 ml-auto lg:flex">
      <div>Sponsored</div>
      <a
        href="https://witchinghr.dev"
        target="_blank"
        className="flex flex-row items-center gap-2 pr-2 transition duration-300 rounded-md hover:bg-neutral-200"
      >
        <div className="overflow-hidden rounded-md">
          <Image
            alt="portfolio"
            src="/images/placeholder.jpg"
            width={90} height={90}
            className="aspect-square" />
        </div>
        <div>
          <div>Portfolio</div>
          <div className="text-sm font-light text-neutral-500">witchinghr.dev</div>
        </div>
      </a>
    </div>
  );
};

export default Sponsored;
