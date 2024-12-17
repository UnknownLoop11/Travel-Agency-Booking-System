/* eslint-disable @next/next/no-img-element */
import React from "react";

// Next imports
import Link from "next/link";

// Services
import { fetchPackage } from "@/app/lib/services";
import moment from "moment";

const PackageDetail = async ({ params }) => {
  const { id } = await params;
  const { title, image, description, availableDates, price } =
    await fetchPackage(id);

  return (
    <div className="w-5/6 mx-auto gap-8 flex h-5/6 py-8">
      <div className=" rounded-md space-y-3">
        <img
          src={image}
          alt={title}
          className="rounded-md max-w-[720px] aspect-auto"
        />
        <div className="flex p-2.5 justify-between gap-2">
          <input type="checkbox" aria-label="Like" className="btn btn-wide" />

          <Link
            href={"/booking/" + id}
            className="btn btn-wide btn-primary float-end"
          >
            Book Now
          </Link>
        </div>
      </div>

      <div className="flex flex-col gap-6">
        <h1 className="text-2xl font-normal">{title}</h1>
        <p className="text-primary font-semibold text-xl">
          $ {price}{" "}
          <span className="text-sm font-extralight text-gray-500">
            / per person
          </span>
        </p>
        <p className="font-light">{description}</p>

        <div className="flex gap-2">
          <p className="font-semibold">Available Dates:</p>
          <div className="flex gap-2 flex-wrap">
            {availableDates.map((date, idx) => (
              <span
                key={idx}
                className="badge badge-lg font-semibold badge-primary"
              >
                {moment(date).format("dddd Do MMM, YYYY")}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PackageDetail;
