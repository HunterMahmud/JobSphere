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
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React from "react";
import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";
import useRole from "../Hooks/useRole"

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
    path: "/companies",
  },
  {
    title: "Blogs",
    path: "/blogs",
  },
];

const Navbar = () => {
  const pathName = usePathname();
  const session = useSession();
  const { loggedInUser } = useRole();

  if (pathName.includes("dashboard")) return;

  return (
    <Disclosure as="nav">
      <div className="mx-auto">
        <div className="relative flex h-[70px] items-center justify-between">
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
          <Link
            href="/"
            className="ml-[60px] md:ml-0  flex flex-shrink-0 items-center"
          >
            <button className="text-2xl font-bold text-white">
              Job<span className="text-sky-600">Sphere</span>
            </button>
          </Link>

          {/* Centered Navigation Links for larger screens */}
          <div className="hidden sm:flex sm:items-center sm:justify-center flex-1">
            <div className="flex space-x-3 lg:space-x-4">
              {links.map((link) => (
                <Link
                  key={link.path}
                  href={link.path}
                  className={`${pathName === link.path
                    ? "bg-primary text-white font-semibold shadow-lg"
                    : "text-gray-300 hover:bg-hover hover:text-white"
                    } rounded-md px-4 py-2 text-sm font-medium transition-all duration-300 ease-in-out`}
                >
                  {link.title}
                </Link>
              ))}
            </div>
          </div>

          {/* Right Section ( Profile ) */}
          <div className="relative inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">

            {/* Profile dropdown */}
            <Menu as="div" className="relative ml-3 mt-2">
              {session?.status === "authenticated" ? (
                <>
                  <div>
                    <MenuButton className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-[1px] focus:ring-offset-gray-800">
                      <span className="sr-only">Open user menu</span>
                      <Image
                        alt="Profile"
                        src={
                          session?.status === "authenticated" &&
                            loggedInUser?.userIMG
                            ? loggedInUser?.userIMG
                            : "https://i.ibb.co/3BY9Fks/profile.png"
                        }
                        className="rounded-full w-10 h-10 object-cover"
                        height={40}
                        width={40}
                      />
                    </MenuButton>
                  </div>
                  <MenuItems className="absolute right-0 z-50 mt-3 w-[250px] origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    {/* If there is user */}
                    {session?.status === "authenticated" && (
                      <>
                        <MenuItem>
                          <div className="p-5 flex flex-col justify-center items-center">
                            <Image className='border rounded-full w-20 h-20 object-cover' src={loggedInUser?.userIMG ||  "https://i.ibb.co/3BY9Fks/profile.png"} width={60} height={50} />
                            <p className="block font-semibold text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-20">
                              {loggedInUser?.userName} {loggedInUser?.name}{" "} {loggedInUser?.fullName}
                            </p>
                            <p className="block text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-20">
                              {session?.data?.user?.email}
                            </p>
                          </div>
                        </MenuItem>
                        {/* Divider */}
                        <div className="border-t-2 border-gray-200"></div>
                        <div className="px-3">
                          <MenuItem>
                            <a
                              href="/dashboard"
                              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-200"
                            >
                              My Dashboards
                            </a>
                          </MenuItem>
                          {loggedInUser?.role === "recruiter" && (
                            <>
                              {/* Divider */}
                              <div className="border-t border-gray-200"></div>
                              <MenuItem>
                                <a
                                  href="/profile/company-information"
                                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-200"
                                >
                                  Company Profile
                                </a>
                              </MenuItem>
                            </>
                          )}
                          {loggedInUser?.role === "recruiter" && (
                            <>
                              {/* Divider */}
                              <div className="border-t border-gray-200"></div>
                              <MenuItem>
                                <a
                                  href="/profile/premiumMembership"
                                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-200"
                                >
                                  Premium Membership
                                </a>
                              </MenuItem>
                            </>
                          )}
                          {loggedInUser?.role === "seeker" && (
                            <>
                              {/* Divider */}
                              <div className="border-t border-gray-200"></div>
                              <MenuItem>
                                <a
                                  href="/profile/profile-overview"
                                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-200"
                                >
                                  My Profile
                                </a>
                              </MenuItem>
                            </>
                          )}
                          {/* Divider */}
                          <div className="border-t border-gray-200"></div>
                          <MenuItem>
                            <>
                              <button
                                onClick={() => signOut()}
                                className="block px-4 py-2 text-sm text-red-600 hover:bg-red-50 w-full text-start hover:text-red-800 transition-colors duration-200"
                              >
                                Logout
                              </button>
                            </>
                          </MenuItem>
                        </div>
                      </>
                    )}
                  </MenuItems>
                </>
              ) : (
                <>
                  <Link
                    href={"/login"}
                    className="px-3 md:px-6 py-2 brder bg-primary text-white rounded-full"
                  >
                    Login
                  </Link>
                </>
              )}
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