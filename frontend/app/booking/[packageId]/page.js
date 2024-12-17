"use server";

import React from "react";

import BookingForm from "@/app/components/forms/BookingForm";

const PackageBooking = async ({ params }) => {
  const { packageId } = await params;

  return (
    <div className="space-y-4 p-2 w-5/6 mx-auto">
      <BookingForm packageId={packageId} />
      <hr />
    </div>
  );
};

export default PackageBooking;
