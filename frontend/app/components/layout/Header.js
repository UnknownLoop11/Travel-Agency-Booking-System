import React from "react";

// Next imports
import Image from "next/image";
import Link from "next/link";

// Constants
import { navLinks } from "@/app/lib/constants";

const Header = () => {
  return (
    <div className="navbar bg-neutral text-neutral-content p-4 rounded-md mb-4">
      {/* Logo  */}
      <Link href={"/"} className="navbar-start">
        <Image src="/icons/travel.svg" alt="logo" width={36} height={36} />
        <span className="text-md font-bold">Travel Agency</span>
      </Link>

      {/* SearchBar */}
      <div className="navbar-center">
        <div className="w-[50rem] input input-bordered flex items-center gap-x-2">
          <input
            type="text"
            className="grow text-black"
            placeholder="Search..."
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="black"
            className="h-4 w-4"
          >
            <path
              fillRule="evenodd"
              d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      </div>

      {/* Nav Links */}
      <div className="navbar-end">
        <div className="flex items-stretch">
          {navLinks.map((link, index) => (
            <Link
              key={index}
              href={link.url}
              className="btn btn-ghost btn-sm rounded-btn"
            >
              {link.title}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Header;
