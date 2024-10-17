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
  const [page, setPage] = useState(1); // State to track the current page
  const [limit, setLimit] = useState(10); // State to track the limit per page
  const [totalUsers, setTotalUsers] = useState(0); // State to track the total number of users

  const fetchUsers = async () => {
    try {
      setLoading(true); // Set loading state to true before the request
  
      // Fetch user data from the API with pagination parameters
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_SITE_ADDRESS}/dashboard/userManagement/api/allUsers`, // Ensure this is the correct endpoint
        {
          params: {
            page,  // Current page for pagination
            limit, // Number of items per page
          },
        }
      );
  
      console.log("Fetched users: ", response.data); // Log to see if data is coming
  
      // Set users and total user count from the response
      setUsers(response.data.users);
      setTotalUsers(response.data.pagination.totalItems); // Use total items from the response
  
      setLoading(false); // Set loading to false after fetching data
    } catch (err) {
      console.error("Error fetching users:", err); // Log the error for debugging
      setError("Failed to fetch users."); // Set error message
      setLoading(false); // Ensure loading is set to false even in case of an error
    }
  };
  
  // useEffect to call fetchUsers when the component mounts or when page or limit changes
  useEffect(() => {
    fetchUsers();
  }, [page, limit]); // Dependencies that will trigger the fetch when changed
  
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

  // Calculate pagination
  const totalPages = Math.ceil(totalUsers / limit); // Use totalUsers for pagination

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <section className="container mx-auto px-4 py-8">
      <div className="flex items-center gap-x-3 mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">
          User Management
        </h2>
        <span className="px-3 py-1 text-xs text-blue-600 bg-blue-100 rounded-full">
          {totalUsers} users {/* Updated to show totalUsers */}
        </span>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50 border-b">
            <tr>
            <th className="px-6 py-4 text-left font-medium text-gray-700">#</th>
              <th className="px-6 py-4 text-left font-medium text-gray-700">
                Name
              </th>
              <th className="px-6 py-4 text-left font-medium text-gray-700">
                Role
              </th>
              <th className="px-6 py-4 text-left font-medium text-gray-700">
                Email
              </th>
              <th className="px-6 py-4 text-left font-medium text-gray-700">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {users.map((user, index) => (
              <tr
              key={index}
              className="border-b hover:bg-gray-50 text-xs md:text-sm"
            >
              <td className="px-6 py-4">{index + 1}</td>
                <td className="py-4 px-6 border-b border-gray-200 text-gray-800">
                  {user.name || user.fullName || user.userName}
                </td>
                <td className="px-6 py-4">
                                        <span className="inline-block px-2 py-1 font-medium rounded-full  bg-blue-100 text-blue-600">
                                            {user?.role}
                                        </span>
                                    </td>
                <td className="py-4 px-6 border-b border-gray-200 text-gray-800">
                  {user.email}
                </td>
                <td className="py-4 px-6 border-b border-gray-200 text-gray-800">
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

      {/* Pagination Controls */}
      <div className="flex items-center justify-between bg-gray-50 px-6 py-4 border-t">
        <div className="flex items-center space-x-2">
          <span className="text-gray-700">View</span>
          <select
            value={limit}
            onChange={(e) => {
              setLimit(parseInt(e.target.value));
              setPage(1); // Reset to the first page when limit changes
            }}
            className="border border-gray-300 rounded-md py-1 px-3"
          >
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="15">15</option>
          </select>
          <span className="text-gray-700 block w-full pr-6">
            Users per page
          </span>
        </div>
        <div className="flex items-center space-x-2">
          <button
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
            className={`text-gray-700 ${page === 1 && "cursor-not-allowed"}`}
          >
            Previous
          </button>
          <div className="space-x-2 flex">
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index + 1}
                onClick={() => setPage(index + 1)}
                className={`btn px-3 py-2 border-2 text-xs font-semibold hover:border hover:border-sky-700 bg-sky-300 hover:bg-sky-400 rounded-lg ${
                  page === index + 1 ? "bg-sky-500 text-white" : ""
                }`}
              >
                {index + 1}
              </button>
            ))}
          </div>
          <button
            disabled={page === totalPages}
            onClick={() => setPage(page + 1)}
            className={`text-gray-700 ${page === totalPages && "cursor-not-allowed"}`}
          >
            Next
          </button>
        </div>
      </div>
    </section>
  );
};

export default UserManagement;
