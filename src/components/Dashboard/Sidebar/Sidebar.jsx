"use client";
import { useEffect, useState } from "react";
import { GrLogout } from "react-icons/gr";
import { FcSettings } from "react-icons/fc";
import { AiOutlineBars } from "react-icons/ai";
import Link from "next/link";
import { IoHomeOutline } from "react-icons/io5";
import { MdAssignmentAdd, MdOutlineWorkOutline } from "react-icons/md";
import MenuItem from "./MenuItem/MenuItem";

const Sidebar = () => {
  const [isActive, setActive] = useState(false);

  // Sidebar Responsive Handler
  const handleToggle = () => {
    setActive(!isActive);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(".navbar")) {
        setActive(false);
      }
    };

<<<<<<< HEAD
    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [handleClickOutside]);
=======
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []); // Empty dependency array to run once on mount
>>>>>>> a293a197e1aa922c90ff45ecc985b2518aef8ee4

  return (
    <>
      {/* Small Screen Navbar */}
      <div className="bg-[#1f2937] text-gray-800 flex justify-between md:hidden">
        <div>
          <div className="block cursor-pointer p-4 font-bold">
            <button className="text-2xl font-bold text-white">
              Job<span className="text-sky-600">Sphere</span>
            </button>
          </div>
        </div>

        <button
          onClick={handleToggle}
          className="mobile-menu-button p-4 focus:outline-none text-white"
        >
          <AiOutlineBars className="h-5 w-5" />
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`z-10 md:fixed flex flex-col justify-between overflow-x-hidden bg-gray-100 w-64 space-y-6 px-2 py-4 absolute inset-y-0 left-0 transform ${
          isActive ? "-translate-x-full" : ""
        } md:translate-x-0 transition duration-200 ease-in-out`}
      >
        <div>
          <div className="bg-[#4a5666] p-3 rounded-md text-center">
            <Link href={"/"} className="text-2xl font-bold text-white">
              Job<span className="text-sky-600">Sphere</span>
            </Link>
          </div>

          {/* Nav Items */}
          <div className="flex flex-col justify-between flex-1 mt-6">
            {/* Menu Items */}
            <nav>
              <MenuItem icon={IoHomeOutline} label="Home" address="/" />
              <MenuItem
                icon={MdAssignmentAdd}
                label="Add a Job"
                address="/dashboard/addjob"
              />
              <MenuItem
                icon={MdOutlineWorkOutline}
                label="My Posted Jobs"
                address="/dashboard/mypostedjobs"
              />
            </nav>
          </div>
        </div>

        <div>
          <hr />
          {/* Profile Menu */}
          <Link
            href={"/profile"}
            className="flex items-center px-4 py-2 my-5 transition-colors duration-300 transform hover:bg-gray-300 hover:text-gray-700 text-gray-600"
          >
            <FcSettings className="w-5 h-5" />
            <span className="mx-4 font-medium">Profile</span>
          </Link>
          <button className="flex w-full items-center px-4 py-2 mt-5 text-gray-600 hover:bg-gray-300 hover:text-gray-700 transition-colors duration-300 transform">
            <GrLogout className="w-5 h-5" />
            <span className="mx-4 font-medium">Logout</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
