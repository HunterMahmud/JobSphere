"use client"; // This must be the first line in your file

import React, { useState, useEffect } from "react";
import axios from "axios";
import { AiFillDelete } from "react-icons/ai"; // Import icons
import Swal from "sweetalert2";

// User Management Component
const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchUsers = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_SITE_ADDRESS}/dashboard/userManagement/api/allUsers`
      );
      console.log("Fetched users: ", response.data); // Log to see if data is coming
      setUsers(response.data.users);
      setLoading(false);
    } catch (err) {
      setError("Failed to fetch users.");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDelete = async (userEmail) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won&apos;t be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          // Send DELETE request to the server
          await axios.delete(
            `${process.env.NEXT_PUBLIC_SITE_ADDRESS}/dashboard/userManagement/api/deleteUser/${userEmail}`
          );

          // Show success message
          Swal.fire({
            title: "Deleted!",
            text: "The user has been deleted.",
            icon: "success",
          });

          // Re-fetch the users after deletion
          fetchUsers();
        } catch (error) {
          // Handle error
          console.log(error);
          Swal.fire({
            title: "Error!",
            text: "Failed to delete the user.",
            icon: "error",
          });
        }
      }
    });
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <section className="container mx-auto px-4 py-8">
      <div className="flex items-center gap-x-3 mb-6">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">
          User Management
        </h2>
        <span className="px-3 py-1 text-xs text-blue-600 bg-blue-100 rounded-full dark:bg-gray-800 dark:text-blue-400">
          {users?.length} users
        </span>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-200 dark:bg-gray-800">
            <tr>
              <th className="py-4 px-6 text-sm font-semibold text-left text-gray-700 dark:text-gray-300">
                Name
              </th>
              <th className="px-12 py-4 text-sm font-semibold text-left text-gray-700 dark:text-gray-300">
                Role
              </th>
              <th className="px-4 py-4 text-sm font-semibold text-left text-gray-700 dark:text-gray-300">
                Email
              </th>
              <th className="px-4 py-4 text-sm font-semibold text-left text-gray-700 dark:text-gray-300">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900">
            {users?.map((user) => (
              <tr
                key={user._id}
                className="hover:bg-gray-100 dark:hover:bg-gray-700 transition duration-150"
              >
                <td className="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                  {user.name}
                  {user.fullName}
                  {user.userName}
                </td>
                <td className="px-12 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                  {user.role}
                </td>
                <td className="py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                  {user.email}
                </td>
                <td className="px-4 py-4 text-sm whitespace-nowrap">
                  <div className="flex items-center gap-x-6">
                    <button
                      className="flex items-center justify-center gap-1 bg-red-500 text-white py-1 px-3 rounded-md hover:bg-red-600 transition mx-2"
                      onClick={() => handleDelete(user.email)}
                    >
                      <AiFillDelete className="text-lg flex items-center justify-center" />
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
