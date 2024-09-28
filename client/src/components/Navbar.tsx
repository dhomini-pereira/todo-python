"use client";
import React, { useState } from "react";
import Sidebar from "./Sidebar";

export default function Navbar() {
  const [sidebarState, setSideBarState] = useState(true);

  const user = {
    username: "dhpe",
    image_url: "https://avatars.githubusercontent.com/u/69544085?v=4",
  };

  return (
    <div
      className="w-screen text-slate-200 h-12 text-lg flex items-center justify-between pl-4 pr-4"
      style={{ backgroundColor: "#0A070E" }}
    >
      <div className="w-fit flex items-center sm:gap-10">
        <Sidebar
          MenuIsActive={sidebarState}
          handle={() => setSideBarState((sidebarState) => !sidebarState)}
        />
        <h1>ToDo App</h1>
      </div>

      <div className="w-fit flex items-center gap-3 text-base">
        {user?.image_url ? (
          <img
            src={user?.image_url}
            alt={user?.username}
            className="h-9 rounded-full"
          />
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="h-9"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
            />
          </svg>
        )}
        <h2>{user?.username || "Unknown"}</h2>
      </div>
    </div>
  );
}
