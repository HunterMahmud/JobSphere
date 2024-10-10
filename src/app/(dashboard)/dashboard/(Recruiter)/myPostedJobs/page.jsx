"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { useSession } from "next-auth/react";
import { AiFillEdit, AiFillDelete, AiFillEye } from "react-icons/ai"; // Import icons
import Link from "next/link";
import Swal from "sweetalert2";

const PostedJobs = () => {
  const [jobs, setJobs] = useState([]); // Initialize jobs as an empty array
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { data: session } = useSession(); // Access session object
  console.log(session?.user?.email);

  // Call fetchJobs on component mount and when email changes
  useEffect(() => {
    // Function to fetch jobs
    const fetchJobs = async () => {
      try {
        if (session?.user?.email) {
          const response = await axios.get(
            `${process.env.NEXT_PUBLIC_SITE_ADDRESS}/dashboard/myPostedJobs/api/${session?.user?.email}`
          );

          // Ensure the response is an array
          console.log(response?.data?.myAddedJobs);
          const jobsData = Array.isArray(response?.data?.myAddedJobs)
            ? response?.data?.myAddedJobs
            : [];
          setJobs(jobsData); // Set jobs state with the correct array
        }
      } catch (error) {
        setError("Error fetching jobs");
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, [session?.user?.email]);



  const handleDelete = async (jobId) => {
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
            `${process.env.NEXT_PUBLIC_SITE_ADDRESS}/dashboard/myPostedJobs/api/postedJobs/${jobId}`
          );

          // Show success message
          Swal.fire({
            title: "Deleted!",
            text: "The job has been deleted.",
            icon: "success",
          });

          // Re-fetch the jobs after deletion
          fetchJobs();
        } catch (error) {
          // Handle error
          Swal.fire({
            title: "Error!",
            text: "Failed to delete the job.",
            icon: "error",
          });
        }
      }
    });
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="max-w-5xl mx-auto py-10">
      <h1 className="text-3xl font-semibold mb-6">My Posted Jobs</h1>
      {jobs.length === 0 ? (
        <div className="text-center text-gray-500">
          You haven&apos;t posted any jobs yet.
        </div>
      ) : (
        <table className="min-w-full bg-white shadow-lg rounded-lg">
          <thead>
            <tr className="bg-gray-100 border-b">
              <th className="py-3 px-6 text-left text-gray-600 font-bold">
                Job Title
              </th>
              <th className="py-3 px-6 text-left text-gray-600 font-bold">
                Company
              </th>
              <th className="py-3 px-6 text-left text-gray-600 font-bold">
                Type
              </th>
              {/* <th className="py-3 px-6 text-left text-gray-600 font-bold">
                Location
              </th> */}
              <th className="py-3 px-6 text-center text-gray-600 font-bold">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(jobs) &&
              jobs.map((job) => (
                <tr key={job._id} className="hover:bg-gray-50 border-b">
                  <td className="py-3 px-6">{job.jobTitle}</td>
                  <td className="py-3 px-6">{job.companyName}</td>
                  <td className="py-3 px-6">{job.jobType}</td>
                  {/* <td className="py-3 px-6">{job.jobLocation}</td> */}
                  <td className="py-3 px-6 text-center flex justify-center gap-2">
                    <Link
                      href={`/dashboard/myPostedJobs/update/${job._id}`}
                      className="flex items-center justify-center gap-1 bg-blue-500 text-white py-1 px-3 rounded-md hover:bg-blue-600 transition"
                    >
                      <AiFillEdit className="mr-1" /> Edit
                    </Link>
                    <button
                      className="flex items-center justify-center gap-1 bg-red-500 text-white py-1 px-3 rounded-md hover:bg-red-600 transition mx-2"
                      onClick={() => handleDelete(job._id)}
                    >
                      <AiFillDelete className="mr-1" /> Delete
                    </button>
                    {/* <button
                      className="flex items-center justify-center gap-1 bg-green-500 text-white py-1 px-3 rounded-md hover:bg-green-600 transition"
                      onClick={() =>
                        (window.location.href = `/view-job/${job.id}`)
                      }
                    >
                      <AiFillEye className="mr-1" /> View
                    </button> */}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default PostedJobs;
