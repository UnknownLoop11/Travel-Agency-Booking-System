/* eslint-disable @next/next/no-img-element */
import React from "react";
import moment from "moment";

import Link from "next/link";

const Card = (props) => {
  return (
    <Link
      href={`/package/${props._id}`}
      className="cursor-pointer hover:ring-2 min-w-[500px] w-[600px] p-3 space-y-2 rounded-md shadow-md border bg-white hover:bg-gray-100 max-sm:w-full"
    >
      <div className="flex items-start gap-2">
        {/* Image */}
        <div className="w-1/2 overflow-hidden h-[150px] rounded-md">
          <img
            src={props.image}
            alt={props.title}
            className="w-full h-full object-cover rounded-md hover:scale-105 transition-transform"
          />
        </div>

        {/* Body */}
        <div className="w-1/2 flex flex-col gap-2.5 justify-between">
          {/* Title and Price */}
          <div className="h-[32] flex justify-between items-start font-semibold">
            <h3 className="hover:relative max-sm:text-sm leading-snug break-words overflow-hidden text-ellipsis hover:bg-white hover:text-wrap hover:overflow-visible hover:p-1.5 z-10 rounded-md">
              {props.title}
            </h3>
            <p className="badge badge-primary">${props.price}</p>
          </div>

          {/* Description */}
          <div className="text-xs font-light h-[60px] text-wrap overflow-hidden text-ellipsis line-clamp-4">
            {props.description}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="flex justify-between items-center mt-1.5">
        {/* Available Dates */}
        <div className="w-1/2 flex items-center flex-wrap gap-x-1.5">
          <p className="text-xs font-semibold">Available Dates:</p>
          <div className="flex gap-x-1.5">
            {props.availableDates.map((date, idx) => (
              <span
                key={idx}
                className="text-xs badge badge-primary font-light"
              >
                {moment(date).format("MMM Do YYYY")}
              </span>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="">
          <button className="btn btn-sm text-xs font-semibold btn-primary">
            Book Now
          </button>
        </div>
      </div>
    </Link>
  );
};

export default Card;
