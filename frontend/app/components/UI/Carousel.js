/* eslint-disable @next/next/no-img-element */
import React from "react";

// Next imports
import { unstable_cache } from "next/cache";
import Link from "next/link";

// Services
import { fetchPackages } from "@/app/lib/services";

const getPackages = unstable_cache(
  async () => {
    return await fetchPackages({ limit: 5 });
  },
  { key: "packages" }
);

const Carousel = async () => {
  const res = await getPackages();

  const packages = res?.tourPackages;

  return (
    <div className="carousel w-full h-[500px] rounded-md">
      {packages.map((pkg, idx) => {
        return (
          <div
            key={idx}
            id={`slide${idx + 1}`}
            className="carousel-item relative w-full"
          >
            <h2 className="w-1/3 absolute top-10 left-16 z-10 text-2xl font-semibold text-white">
              {pkg.title}
            </h2>
            <img src={pkg.image} alt={pkg.title} className="w-full" />

            <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
              <Link href={`#slide${idx}`} className="btn btn-circle">
                {"<"}
              </Link>
              <Link href={`#slide${idx + 2}`} className="btn btn-circle">
                {">"}
              </Link>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Carousel;
