/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useRef, useEffect } from "react";
import Card from "../UI/Card";

import Link from "next/link";

const ScrollContainer = ({ title, items, link = "#" }) => {
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        left: 0,
        behavior: "smooth",
      });
    }
  }, [scrollRef]);

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        left: scrollRef.current.scrollLeft + 800,
        behavior: "smooth",
      });
    }
  };

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        left: scrollRef.current.scrollLeft - 800,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="relative py-2 px-6 bg-gray-200 rounded-md">
      <div className="flex justify-between items-baseline mb-2">
        <h2 className="text-xl font-semibold">{title}</h2>
        <Link href={link} className="link text-xs">
          View More
        </Link>
      </div>
      <div
        ref={scrollRef}
        className="overflow-x-scroll whitespace-nowrap py-4 scroll-smooth"
      >
        <div className="flex gap-4">
          {items.map((item, idx) => (
            <Card key={idx} {...item} />
          ))}
        </div>
      </div>

      {/* Scroll Actions */}
      <div className=" max-sm:hidden w-full absolute top-1/2 left-0 transform -translate-y-1/2 flex justify-between items-center gap-2">
        <button
          className="btn btn-sm btn-square btn-primary p-1.5"
          onClick={scrollLeft}
        >
          <img
            src="/icons/arrow-right.svg"
            alt="left"
            className="transform rotate-180"
          />
        </button>
        <button
          className="btn btn-sm btn-square btn-primary p-1.5"
          onClick={scrollRight}
        >
          <img src="/icons/arrow-right.svg" alt="right" />
        </button>
      </div>
    </div>
  );
};

export default ScrollContainer;
