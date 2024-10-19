"use client"; // Ensure this is the first line

import React, { useState, useEffect } from "react";
import axios from "axios";
import { AiFillDelete } from "react-icons/ai";
import Swal from "sweetalert2";
import Loader from "@/app/loading";

// User Management Component
const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [totalUsers, setTotalUsers] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterByRole, setFilterByRole] = useState("");

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_SITE_ADDRESS}/dashboard/userManagement/api/allUsers`,
        {
          params: {
            role: filterByRole,
            email: searchTerm,
            page,
            limit,
          },
        }
      );

      setUsers(response.data.users);
      setTotalUsers(response.data.pagination.totalItems);
      setLoading(false);
    } catch (err) {
      setError("Failed to fetch users.");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [page, limit, filterByRole, searchTerm]);

  const handleDelete = async (userEmail, userRole) => {
    if (userRole === "admin") {
      Swal.fire({
        title: "Error!",
        text: "Cannot delete an admin user.",
        icon: "error",
      });
      return;
    }

    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(
            `${process.env.NEXT_PUBLIC_SITE_ADDRESS}/dashboard/userManagement/api/deleteUser/${userEmail}`
          );

          Swal.fire("Deleted!", "The user has been deleted.", "success");
          fetchUsers();
        } catch (error) {
          Swal.fire("Error!", "Failed to delete the user.", "error");
        }
      }
    });
  };

  const totalPages = Math.ceil(totalUsers / limit);

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <section className="container mx-auto px-4 py-8">
      <div className="flex justify-center items-center gap-x-3 mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">User Management</h2>
        <span className="px-3 py-1 text-xs text-blue-600 bg-blue-100 rounded-full">
          {totalUsers} users
        </span>
      </div>

      <div className="mb-6 p-4 bg-white rounded-lg shadow-md flex items-center justify-between">
        <div className="flex flex-col md:flex-row justify-between gap-4 w-full">
          <select
            onChange={(e) => setFilterByRole(e.target.value)}
            value={filterByRole}
            className="border border-gray-300 rounded-md py-2 px-4 w-full focus:outline-none"
          >
            <option value="">Filter by Role</option>
            <option value="seeker">seeker</option>
            <option value="recruiter">recruiter</option>
            <option value="admin">admin</option>
          </select>

          <input
            type="text"
            placeholder="Search by Email..."
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border w-full border-gray-300 rounded-md py-2 px-4 focus:outline-none"
          />
        </div>
      </div>

      <div className="overflow-x-auto">
        {loading ? (
          <Loader />
        ) : (
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="px-6 py-4 text-left font-medium text-gray-700">#</th>
                <th className="px-6 py-4 text-left font-medium text-gray-700">Name</th>
                <th className="px-6 py-4 text-left font-medium text-gray-700">Role</th>
                <th className="px-6 py-4 text-left font-medium text-gray-700">Email</th>
                <th className="px-6 py-4 text-left font-medium text-gray-700">Action</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {users.map((user, index) => (
                <tr key={index} className="border-b hover:bg-gray-50">
                  <td className="px-6 py-4">{index + 1}</td>
                  <td className="py-4 px-6 text-gray-800">
                    {user.name || user.fullName || user.userName}
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-block px-2 py-1 font-medium rounded-full bg-blue-100 text-blue-600">
                      {user.role}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-gray-800">{user.email}</td>
                  <td className="py-4 px-6">
                    <button
                      className={`bg-red-500 text-white py-1 px-3 rounded-md transition ${
                        user.role === "admin" ? "cursor-not-allowed opacity-50" : "hover:bg-red-600"
                      }`}
                      onClick={() => handleDelete(user.email, user.role)}
                      disabled={user.role === "admin"}
                    >
                      <AiFillDelete />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <div className="flex items-center justify-between bg-gray-50 px-6 py-4 border-t">
        <div className="flex items-center space-x-2">
          <span className="text-gray-700">View</span>
          <select
            value={limit}
            onChange={(e) => {
              setLimit(parseInt(e.target.value));
              setPage(1);
            }}
            className="border border-gray-300 rounded-md py-1 px-3"
          >
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="15">15</option>
          </select>
          <span className="text-gray-700">Users per page</span>
        </div>
        <div className="flex items-center space-x-2">
          <button
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
            className={`text-gray-700 ${page === 1 && "cursor-not-allowed"}`}
          >
            Previous
          </button>
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index + 1}
              onClick={() => setPage(index + 1)}
              className={`btn px-3 py-2 border-2 font-semibold rounded-lg ${
                page === index + 1 ? "bg-sky-500 text-white" : "bg-sky-300"
              }`}
            >
              {index + 1}
            </button>
          ))}
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