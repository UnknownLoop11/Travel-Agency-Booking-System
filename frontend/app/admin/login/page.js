"use client";

import React, { useState } from "react";

// Next imports
import { useRouter } from "next/navigation";

// Services
import { loginAdmin } from "@/app/lib/services";

const AdminLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const data = {
      username,
      password,
    };

    const res = await loginAdmin(data);

    if (res.status === "NOT FOUND" || res.status === "ERROR") {
      setError(res.message);
    }

    if (res.status === "SUCCESS") {
      console.log("Login Successful");
      sessionStorage.setItem("token", res.token);
      router.push("/admin");
    }

    setLoading(false);
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="relative form-control h-screen w-screen flex flex-col justify-center items-center"
      >
        <div className="absolute top-10 left-10">
          <button
            type="button"
            onClick={() => router.push("/")}
            className="btn btn-primary"
          >
            Go Home
          </button>
        </div>
        <div className="border border-black p-8 shadow-md rounded-md space-y-3 w-96 text-center">
          <h1 className="text-3xl font-semibold">Admin Login</h1>
          <label
            htmlFor="email"
            className="input input-bordered flex items-center gap-x-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="h-4 w-4 opacity-70"
            >
              <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
            </svg>
            <input
              type="text"
              className="grow"
              placeholder="Username"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </label>
          <label className="input input-bordered flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="h-4 w-4 opacity-70"
            >
              <path
                fillRule="evenodd"
                d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                clipRule="evenodd"
              />
            </svg>
            <input
              type="password"
              className="grow"
              placeholder="Password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          {error && <p className="text-sm text-red-500">{error}</p>}
          <button
            className={`btn btn-primary w-full ${loading && "btn-disabled"}`}
            type="submit"
          >
            LOGIN {loading && <span className="loading loading-spinner"></span>}
          </button>
        </div>
      </form>
    </>
  );
};

export default AdminLogin;
