"use client"; // This must be the first line in your file

import React, { useState } from "react";

// Sample JSON Fake Data for Users
const userData = [
  {
    id: 1,
    name: "John Doe",
    role: "Admin",
    status: "Active",
    registeredDate: "2024-01-01",
  },
  {
    id: 2,
    name: "Jane Smith",
    role: "Seeker",
    status: "Inactive",
    registeredDate: "2024-02-15",
  },
  {
    id: 3,
    name: "Bob Johnson",
    role: "Recruiter",
    status: "Active",
    registeredDate: "2024-03-23",
  },
  {
    id: 4,
    name: "Alice Brown",
    role: "Seeker",
    status: "Active",
    registeredDate: "2024-04-12",
  },
  {
    id: 5,
    name: "Charlie Davis",
    role: "Seeker",
    status: "Inactive",
    registeredDate: "2024-05-20",
  },
];

const UserManagement = () => {
  const [users, setUsers] = useState(userData);

  return (
    <section className="container mx-auto px-4 py-8">
      <div className="flex items-center gap-x-3 mb-6">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">User Management</h2>
        <span className="px-3 py-1 text-xs text-blue-600 bg-blue-100 rounded-full dark:bg-gray-800 dark:text-blue-400">
          {users.length} users
        </span>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-200 dark:bg-gray-800">
            <tr>
              <th className="py-4 px-6 text-sm font-semibold text-left text-gray-700 dark:text-gray-300">Name</th>
              <th className="px-12 py-4 text-sm font-semibold text-left text-gray-700 dark:text-gray-300">Role</th>
              <th className="px-4 py-4 text-sm font-semibold text-left text-gray-700 dark:text-gray-300">Status</th>
              <th className="px-4 py-4 text-sm font-semibold text-left text-gray-700 dark:text-gray-300">Registered Date</th>
              <th className="px-4 py-4 text-sm font-semibold text-left text-gray-700 dark:text-gray-300">Action</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900">
            {users.map((user) => (
              <tr key={user.id} className="hover:bg-gray-100 dark:hover:bg-gray-700 transition duration-150">
                <td className="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">{user.name}</td>
                <td className="px-12 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">{user.role}</td>
                <td className={`px-4 py-4 text-sm font-medium ${user.status === "Active" ? "text-green-500" : "text-red-500"}`}>
                  {user.status}
                </td>
                <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">{user.registeredDate}</td>
                <td className="px-4 py-4 text-sm whitespace-nowrap">
                  <div className="flex items-center gap-x-6">
                    <button className="text-gray-500 hover:text-red-500 focus:outline-none">
                      {/* Delete Icon */}
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default UserManagement;
