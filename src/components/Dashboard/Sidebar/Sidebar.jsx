"use client";
import { useEffect, useState } from "react";
import { GrLogout } from "react-icons/gr";
import { FcStatistics } from "react-icons/fc";
import { AiOutlineBars } from "react-icons/ai";
import Link from "next/link";
import { IoHomeOutline } from "react-icons/io5";
import { RiSave3Line } from "react-icons/ri";
import { MdAssignmentAdd, MdOutlineWorkOutline, MdOutlineManageSearch } from "react-icons/md";
import MenuItem from "./MenuItem/MenuItem";
import { ImProfile } from "react-icons/im";
import { GoCodeReview } from "react-icons/go";
import { FaLaptopHouse, FaUserCog } from "react-icons/fa";
import useRole from "@/components/Hooks/useRole";
import { TfiWrite } from "react-icons/tfi";
import { signOut } from "next-auth/react";

const Sidebar = () => {
  const [isActive, setActive] = useState(false);
  const { loggedInUser } = useRole();

  // Sidebar Responsive Handler
  const handleToggle = () => {
    setActive(!isActive);
  };

  return (
    <>
      {/* Small Screen Navbar */}
      <div className="bg-[#1f2937]  text-gray-800 flex justify-between md:hidden">
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
        className={`z-10 md:fixed flex flex-col justify-between overflow-x-hidden bg-gray-100 w-64 space-y-6 px-2 py-4 absolute inset-y-0 left-0 transform ${isActive ? "-translate-x-full" : ""
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
            {
              loggedInUser?.role === "seeker" &&
              <nav>
                <MenuItem icon={FaLaptopHouse} label="Applyed Jobs" address="/dashboard/applyedJobs" />
                <MenuItem icon={RiSave3Line} label="Saved Jobs" address="/dashboard/savedJobs" />
              </nav>
            }
            {
              loggedInUser?.role === "recruiter" &&
              <nav>
                <MenuItem icon={MdAssignmentAdd} label="Post A Job" address="/dashboard/postAJob" />
                <MenuItem icon={TfiWrite} label="Write A Blog" address="/dashboard/writeABlog" />
                <MenuItem icon={MdOutlineWorkOutline} label="My Posted Jobs" address="/dashboard/myPostedJobs" />
              </nav>
            }
            {
              loggedInUser?.role === "admin" &&
              <nav>
                <MenuItem icon={FaUserCog} label="User Management" address="/dashboard/userManagement" />
                <MenuItem icon={MdOutlineManageSearch} label="Job Management" address="/dashboard/jobManagement" />
                {/* <MenuItem icon={GoCodeReview} label="Interview" address="/dashboard/interview" />
                <MenuItem icon={FcStatistics} label="Statistics" address="/dashboard/statistics" /> */}
              </nav>
            }
          </div>
        </div>

        <div>
          <hr />
          <MenuItem icon={IoHomeOutline} label="Home" address="/dashboard" />
          <button
            onClick={() => signOut({ callbackUrl: '/' })}
            className="hover:text-red-500 flex w-full items-center px-4 py-2 mt-5 text-gray-600 hover:bg-red-100 transition-colors duration-300 transform">
            <GrLogout className="w-5 h-5" />
            <span className="mx-4 font-medium">Logout</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default Sidebar;