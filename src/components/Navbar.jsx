"use client";

import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from "@headlessui/react";
import {
  Bars3Icon,
  BellIcon,
  XMarkIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import { FaRegUser } from "react-icons/fa";
import { MdWorkOutline } from "react-icons/md";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React from "react";

const links = [
  {
    title: "Home",
    path: "/",
  },

  {
    title: "Jobs",
    path: "/jobs",
  },
  {
    title: "Companies",
    path: "/companies"
  },
  {
    title: "About Us",
    path: "/aboutus",
  },
  {
    title: "Contact",
    path: "/aboutus",
  }
];


const Navbar = () => {
  const pathName = usePathname();
  const router = useRouter();
  const user = false;

  return (
    <Disclosure as="nav">
      <div className="mx-auto">
        <div className="relative flex h-16 items-center justify-between">
          {/* Mobile menu button */}
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
              <span className="sr-only">Open main menu</span>
              <Bars3Icon
                aria-hidden="true"
                className="block h-6 w-10 group-data-[open]:hidden"
              />
              <XMarkIcon
                aria-hidden="true"
                className="hidden h-6 w-10 group-data-[open]:block"
              />
            </DisclosureButton>
          </div>


          {/* Logo for all screens */}
          <Link href="/" className="ml-[60px] md:ml-0  flex flex-shrink-0 items-center">
            <button className="text-2xl font-bold text-white">Job<span className="text-sky-600">Sphere</span></button>
          </Link>


          {/* Centered Navigation Links for larger screens */}
          <div className="hidden sm:flex sm:items-center sm:justify-center flex-1">
            <div className="flex space-x-4">
              {links.map((link) => (
                <Link
                  key={link.path}
                  href={link.path}
                  className={`${pathName === link.path
                    ? "bg-blue-600 text-white font-semibold shadow-lg"
                    : "text-gray-300 hover:bg-blue-500 hover:text-white"
                    } rounded-md px-4 py-2 text-sm font-medium transition-all duration-300 ease-in-out`}
                >
                  {link.title}
                </Link>
              ))}
            </div>
          </div>


          {/* Right Section (Search, Profile, Notifications) */}
          <div className="relative inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            {/* Search Section */}
            {/* Notifications */}
            <button
              type="button"
              className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
            >
              <span className="sr-only">View notifications</span>
              <BellIcon aria-hidden="true" className="h-6 w-6" />
            </button>

            {/* Profile dropdown */}
            <Menu as="div" className="relative ml-3 mt-2">
              <div>
                <MenuButton className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-[1px] focus:ring-offset-gray-800">
                  <span className="sr-only">Open user menu</span>
                  <Image
                    alt="Profile"
                    src={user ? 'https://i.ibb.co.com/3BY9Fks/profile.png' : 'https://i.ibb.co.com/3BY9Fks/profile.png'}
                    className="rounded-full"
                    height={40}
                    width={40}
                  />
                </MenuButton>
              </div>
              <MenuItems className="absolute right-0 z-10 mt-2 w-[300px] origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                {/* <MenuItem>
                  <a
                    href="/dashboard"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-200"
                  >
                    My Dashboards
                  </a>
                </MenuItem> */}
                {/* Users */}
                <MenuItem>
                  <div className="flex gap-2 py-2">
                    <div className="w-[80px] flex justify-end">
                      <div className="bg-[#68aa47] rounded-full w-12 h-12 flex justify-center items-center">
                        <MdWorkOutline className="text-2xl text-white" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <h1 className="text-sm font-medium">My Jobs</h1>
                      <p className="text-[13px]">
                        Sign in or create your account to manage your profile
                      </p>
                      <div className="flex gap-2 mt-1">
                        <button className="border text-xs text-blue-500 shadow-xl px-2 py-[2px] rounded">Sign in</button>
                        <button className="border text-xs text-blue-500 shadow-xl px-2 py-[2px] rounded">Create Account</button>
                      </div>
                    </div>
                  </div>
                </MenuItem>
                 {/* Divider */}
                 <div className="border-t border-gray-200"></div>
                {/* Employers */}
                <MenuItem>
                  <div className="flex gap-2 py-2">
                    <div className="w-[80px] flex justify-end">
                      <div className="bg-blue-500 rounded-full w-12 h-12 flex justify-center items-center">
                        <FaRegUser className="text-2xl text-white" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <h1 className="text-sm font-medium">Employers</h1>
                      <p className="text-[13px]">
                        Sign in or create your account find the best candidates in the fastest way
                      </p>
                      <div className="flex gap-2 mt-1">
                        <button className="border text-xs text-blue-500 shadow-xl px-2 py-[2px] rounded">Sign in</button>
                        <button className="border text-xs text-blue-500 shadow-xl px-2 py-[2px] rounded">Create Account</button>
                      </div>
                    </div>
                  </div>
                </MenuItem>

               
                {/* Divider */}
                <div className="border-t border-gray-200"></div>
                {/* <MenuItem>
                  {user  && (
                    <>
                    <a
                      href="#"
                      className="block px-4 py-2 text-sm text-red-600 hover:bg-red-50 hover:text-red-800 transition-colors duration-200"
                    >
                      Sign out
                    </a>
                    </>
                  ) }
                </MenuItem> */}
              </MenuItems>
            </Menu>
          </div>
        </div>
      </div>


      {/* Mobile Navigation Links */}
      <DisclosurePanel className="sm:hidden">
        <div className="flex flex-col space-y-1 px-2 pb-3 pt-2">
          {links.map((link) => (
            <Link
              key={link.path}
              href={link.path}
              className={`${pathName === link.path
                ? "bg-blue-600 text-white font-semibold shadow-lg"
                : "text-gray-300 hover:bg-blue-500 hover:text-white"
                } rounded-md px-4 py-2 text-sm font-medium transition-all duration-300 ease-in-out`}
            >
              {link.title}
            </Link>
          ))}
        </div>
      </DisclosurePanel>
    </Disclosure>
  );
};


export default Navbar;

