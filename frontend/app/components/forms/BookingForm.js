"use client";

import React, { useState, useEffect } from "react";
import Invoice from "../UI/Invoice";

import { createBooking, fetchPackage } from "@/app/lib/services";

const BookingForm = ({ packageId }) => {
  const [form, setForm] = useState({
    customerName: "",
    email: "",
    phone: "",
    numberOfTravellers: 1,
    specialRequests: "",
    packageId,
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [booking, setBooking] = useState(null);
  const [packageDetail, setPackage] = useState(null);

  useEffect(() => {
    const fetchPackageData = async () => {
      const res = await fetchPackage(packageId);
      setPackage(res);
    };

    fetchPackageData();
  }, [packageId]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(form);
    const res = await createBooking(form);
    setIsSubmitted(true);
    setBooking(res);
  };

  return (
    <>
      {!isSubmitted && (
        <form onSubmit={handleSubmit} className="space-y-4 w-[500px]">
          <h1 className="font-semibold text-2xl">
            Book Package{" "}
            <span className="text-xs font-extralight">
              *Fill in the below details to proceed
            </span>
          </h1>
          <label className="form-control space-y-2">
            <span className="font-semibold label-text">Full Name</span>
            <input
              name="customerName"
              type="text"
              className="input input-bordered"
              required
              value={form.customerName}
              onChange={handleChange}
            />
          </label>
          <label className="form-control space-y-2">
            <span className="font-semibold label-text">Email</span>
            <input
              name="email"
              type="email"
              className="input input-bordered"
              required
              value={form.email}
              onChange={handleChange}
            />
          </label>
          <label className="form-control space-y-2">
            <span className="font-semibold label-text">Phone Number</span>
            <input
              name="phone"
              type="number"
              className="input input-bordered"
              required
              value={form.phone}
              onChange={handleChange}
            />
          </label>
          <label className="form-control space-y-2 w-32">
            <span className="font-semibold label-text text-nowrap">
              Number of Travellers
            </span>
            <input
              name="numberOfTravellers"
              type="number"
              className="input input-bordered"
              required
              value={form.numberOfTravellers}
              onChange={handleChange}
            />
          </label>
          <label className="form-control space-y-2">
            <div className="label">
              <span className="font-semibold label-text text-nowrap">
                Special Requests
              </span>
              <span className="label-text-alt">(optional)</span>
            </div>
            <textarea
              name="specialRequest"
              type="number"
              className="textarea textarea-bordered"
              value={form.specialRequests}
              onChange={handleChange}
            />
          </label>
          <button type="submit" className="btn btn-wide btn-primary float-">
            Proceed
          </button>
        </form>
      )}

      {isSubmitted && (
        <div className="space-y-4">
          <h1 className="font-semibold text-2xl">Your Invoice</h1>
          <Invoice
            customerName={booking.customerName}
            packageName={packageDetail?.title}
            pricePerPerson={packageDetail.price}
            numberOfTravelers={booking.numberOfTravellers}
            email={booking.email}
            phoneNumber={booking.phone}
          />
        </div>
      )}
    </>
  );
};

export default BookingForm;
