"use client"

import Image from "next/image";

// Sponsored
// sponsored content, contains links to my sites
const Sponsored = () => {
  return (
    <div className="flex-col hidden gap-2 py-4 pr-4 mx-auto lg:flex">
      <div className="text-black whitespace-normal dark:text-neutral-400">Be sure to check out my other projects</div>

      <a
        href="https://witchinghr.dev"
        target="_blank"
        className="sponsored-grid gap-4 pr-2 transition duration-300 rounded-md
        hover:bg-neutral-200 dark:hover:bg-[#3a3b3c]"
      >
        <div className="overflow-hidden rounded-md">
          <Image
            alt="portfolio"
            src="https://res.cloudinary.com/dz2uaj7ms/image/upload/v1684684253/Screenshot_2023-05-21_at_11.49.43_AM_enftxw.png"
            width={90} height={90}
            className="object-contain duration-300 aspect-square hover:scale-110" />
        </div>
        <div className="my-auto">
          <div className="text-black dark:text-neutral-400">My Portfolio</div>
          <div className="text-sm font-light text-neutral-500 dark:text-neutral-400">witchinghr.dev</div>
        </div>
      </a>

      <a
        href="https://abnb-clone-jade.vercel.app/"
        target="_blank"
        className="sponsored-grid gap-4 pr-2 transition duration-300 rounded-md
        hover:bg-neutral-200 dark:hover:bg-[#3a3b3c]"
      >
        <div className="overflow-hidden rounded-md h-min">
          <Image
            alt="portfolio"
            src="https://res.cloudinary.com/dz2uaj7ms/image/upload/v1684684026/abb1_jpbke0.png"
            width={90} height={90}
            className="object-cover duration-300 aspect-square hover:scale-110" />
        </div>
        <div className="my-auto">
          <div className="text-black dark:text-neutral-400">Airbnb Clone</div>
          <div className="text-sm font-light text-neutral-500 dark:text-neutral-400">abnb-clone-jade.vercel.app</div>
        </div>
      </a>
    </div>
  );
};

export default Sponsored;
