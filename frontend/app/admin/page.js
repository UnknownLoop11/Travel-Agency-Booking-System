"use client";

// Next imports
import { redirect } from "next/navigation";
import Link from "next/link";

import React, { useEffect, useState } from "react";

// Services
import { fetchBookings, fetchPackages } from "../lib/services";
import moment from "moment";

// Forms
import PackageForm from "../components/forms/PackageForm";

const AdminDashboard = () => {
  const [activeMenu, setActiveMenu] = useState("packages");

  const [packages, setPackages] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [form, setForm] = useState({
    activeForm: null,
    formData: null,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (activeMenu === "packages") {
      // Fetch packages
      fetchPackages({ page: 1, limit: 50 }).then((data) => {
        setPackages(data.tourPackages);
      });
    } else if (activeMenu === "bookings") {
      // Fetch bookings
      fetchBookings().then((data) => {
        console.log(data);
        setBookings(data);
      });
    } else if (activeMenu === "form") {
    }
  }, [activeMenu]);

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (!token) {
      redirect("/admin/login");
    } else {
      setLoading(false);
    }
  }, []);

  const logout = () => {
    sessionStorage.removeItem("token");
    redirect("/admin/login");
  };

  const openPackage = (data = null) => {
    setActiveMenu("form");
    setForm({
      activeForm: "package",
      formData: data && data,
    });
  };

  if (loading) {
    return (
      <div className="h-screen w-screen flex flex-col justify-center items-center">
        <span className="loading loading-dots loading-lg"></span>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header  */}
      <header className="flex flex-row justify-between items-center px-10 py-6 bg-gray-800 text-white">
        <h1 className="text-lg font-semibold">Admin Dashboard</h1>
        <div className="flex flex-row gap-x-12 items-baseline">
          <Link href={"/"} className="text-sm link link-info">
            Go Home
          </Link>
          <button onClick={logout} className="btn btn-sm">
            Logout
          </button>
        </div>
      </header>

      <main className="mdw-5/6 mx-auto flex flex-row gap-x-4 items-start justify-stretch">
        {/* Sidebar */}
        <div className="w-[400px] px-20 py-16 border-r ">
          <h2 className="text-xl">Collections</h2>
          <ul className="*:w-52 *:shadow *:rounded-md *:bg-neutral-content *:text-sm menu menu-vertical space-y-2 mt-4">
            <li>
              <a role="button" onClick={() => setActiveMenu("packages")}>
                Packages
              </a>
            </li>
            <li>
              <a role="button" onClick={() => setActiveMenu("bookings")}>
                Bookings
              </a>
            </li>
          </ul>
        </div>

        {/* Main Content */}
        <div className="w-3/4 px-6 py-16">
          {/* Packages */}
          {activeMenu === "packages" && (
            <div className="space-y-4">
              <header className="flex flex-row justify-between items-center">
                <h2 className="text-xl font-semibold">Packages</h2>
                <button
                  className="btn btn-sm btn-primary"
                  onClick={openPackage}
                >
                  + New Package
                </button>
              </header>
              <div className="overflow-x-auto">
                <table className="table table-zebra">
                  <thead>
                    <tr>
                      <th>Sl No.</th>
                      <th>Package Name</th>
                      <th>Price</th>
                      <th>Created At</th>
                    </tr>
                  </thead>
                  <tbody>
                    {packages.map((p, idx) => (
                      <tr key={p._id}>
                        <td>{idx + 1}</td>
                        <td>
                          <a
                            role="button"
                            onClick={() => openPackage(p)}
                            className="link hover:text-primary"
                          >
                            {p.title}
                          </a>
                        </td>
                        <td>{p.price} $</td>
                        <td>
                          {moment(p.createdAt).format("MMM Do YYYY, h:mm a")}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Bookings  */}
          {activeMenu === "bookings" && (
            <div className="space-y-3">
              <h2 className="text-xl font-semibold">Recent Bookings</h2>
              <hr />
              <div className="overflow-x-auto">
                <table className="table table-zebra">
                  <thead>
                    <tr>
                      <th>Sl No.</th>
                      <th>Customer Name</th>
                      <th>Email</th>
                      <th>Phone No</th>
                      <th>No. of Travellers</th>
                      <th>Booked On</th>
                      <th>Special Request</th>
                    </tr>
                  </thead>
                  <tbody>
                    {bookings.map((b, idx) => {
                      return (
                        <tr key={idx}>
                          <td>{idx + 1}</td>
                          <td>{b.customerName}</td>
                          <td>{b.email}</td>
                          <td>{b.phone}</td>
                          <td>{b.numberOfTravellers}</td>
                          <td>
                            {moment(b.createdAt).format("Do MMM YYYY hh:mm a")}
                          </td>
                          <td>{b.specialRequest || "None"}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Forms */}
          {activeMenu === "form" && (
            <div className="">
              {form && form.activeForm === "package" && (
                <PackageForm
                  formData={form.formData}
                  onCancel={() => setActiveMenu("packages")}
                />
              )}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
