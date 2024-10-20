"use client";
import Loader from "@/app/loading";
import { useState, useEffect, Fragment } from "react";
import axios from "axios";
import { useSession } from "next-auth/react";
import { AiFillEdit, AiFillDelete, AiFillEye } from "react-icons/ai"; // Import icons
import Link from "next/link";
import Swal from "sweetalert2";

const PostedJobs = () => {
  const [jobs, setJobs] = useState([]); // Initialize jobs as an empty array
  const [sort, setSort] = useState("");
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { data: session } = useSession(); // Access session object
  const [search, setSearch] = useState('');
  const [jobStatus, setJobStatus] = useState('');

  const fetchJobs = async () => {
    try {
      if (session?.user?.email) {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_SITE_ADDRESS}/dashboard/myPostedJobs/api/${session?.user?.email}`
        );

        // Ensure the response is an array
        // console.log(response?.data?.myJobs);
        const jobsData = Array.isArray(response?.data?.myJobs)
          ? response?.data?.myJobs
          : [];
        setJobs(jobsData); // Set jobs state with the correct array
      }
    } catch (error) {
      setError("Error fetching jobs");
    } finally {
      setLoading(false);
    }
  };

  // Call fetchJobs on component mount and when email changes
  useEffect(() => {
    // Function to fetch jobs

    fetchJobs();
  }, [session?.user?.email, search]);

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
          // console.log(error);
          Swal.fire({
            title: "Error!",
            text: "Failed to delete the job.",
            icon: "error",
          });
        }
      }
    });
  };

  console.log(jobs);

  if (loading) return <Loader />;
  if (error) return <div>{error}</div>;

  return (
    <Fragment>
      <div className="max-w-7xl mx-auto py-8 md:px-4">
        {/* Page Title  */}
        <h1 className="text-2xl font-bold text-center mb-8">My Posted Jobs</h1>

        {/* Filter Section */}
        <div className="mb-6 md:p-4 bg-white rounded-lg shadow-md flex items-center justify-between">
          <div className="flex flex-col md:flex-row justify-between gap-4 w-full">
            <select
              onChange={(e) => setJobStatus(e.target.value)}
              className="border border-gray-300 rounded-md py-2 px-4 w-full focus:outline-none focus:ring focus:border-blue-300"
            >
              <option value="">Filter by Job Status</option>
              <option value="Live">Live</option>
              <option value="Closed">Closed</option>
            </select>

            <select
              onChange={(e) => {
                setSort(e.target.value);
              }}
              value={sort}
              name="category"
              id="category"
              className="border border-gray-300 rounded-md py-2 px-4 w-full focus:outline-none focus:ring focus:border-blue-300"
            >
              <option value="">Sort by Applicants Number</option>
              <option value="dsc">Descending Order</option>
              <option value="asc">Ascending Order</option>
            </select>

            <select
              onChange={(e) => setJobType(e.target.value)}
              className="border border-gray-300 rounded-md py-2 px-4 w-full focus:outline-none focus:ring focus:border-blue-300"
            >
              <option value="">Filter by Job Type</option>
              <option value="Full-Time">Full-Time</option>
              <option value="Part-Time">Part-Time</option>
              <option value="Contract-Based">Contract-Based</option>
            </select>

            <div className="flex gap-2 w-full">
              <input
                type="text"
                placeholder="Search by job title..."
                onChange={(e) => {
                  setSearch(e.target.value), setPage(1);
                }}
                className="border w-full border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring focus:border-blue-300"
              />
            </div>
          </div>
        </div>

        {/* Table  */}
        <div className="overflow-x-auto border rounded-lg shadow-md">
          {loading ? (
            <Loader />
          ) : 
            jobs?.length === 0 ? (
              <div className="text-center text-gray-500">
                You haven&apos;t posted any jobs yet.
              </div>
            ):(
            <table className="min-w-full bg-white">
              {/* Table Header  */}
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-6 py-4 text-left font-medium text-gray-700">
                    #
                  </th>
                  <th className="px-6 py-4 text-left font-medium text-gray-700">
                    Job Title
                  </th>
                  <th className="px-6 py-4 text-left font-medium text-gray-700">
                    Job Type
                  </th>
                  <th className="px-6 py-4 font-medium text-gray-700">
                    Job Deadline
                  </th>
                  <th className="px-6 py-4 font-medium text-gray-700">
                    Job Status
                  </th>
                  <th className="px-6 py-4 font-medium text-gray-700">
                    Total Applications
                  </th>
                  <th className="px-6 py-4 text-center font-medium text-gray-700">
                    Actions
                  </th>
                </tr>
              </thead>

              {/* Table Body  */}
              <tbody>
                {jobs?.map((job, index) => (
                  <tr
                    key={index}
                    className="border-b hover:bg-gray-50 text-xs md:text-sm"
                  >
                    <td className="px-6 py-4">{index + 1}</td>

                    <td className="px-1 md:px-3 lg:px-6 py-4 flex items-center gap-2 hover:underline">
                      <Link href={`/jobs/${job?._id}`}>{job?.jobTitle}</Link>
                    </td>
                    <td className="px-6 py-4">
                    <span className="inline-block px-2 py-1 font-medium rounded-full bg-blue-100 text-blue-600">
                                            {job?.jobType}
                                        </span>
                      </td>
                    <td className="px-6 py-4 text-center">
                      {new Date(job?.deadline).toLocaleDateString()}
                    </td>
                    {/* job Status  */}
                    <td className="px-1 md:px-3 lg:px-6 py-4 text-center">
                      <span
                        className={`inline-block px-2 py-1 font-medium rounded-full ${
                          new Date(job?.deadline) > new Date()
                            ? "bg-green-100 text-green-600"
                            : "bg-red-100 text-red-600"
                        }`}
                      >
                        {new Date(job?.deadline) > new Date()
                          ? "Live"
                          : "Closed"}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <Link
                        href={`/dashboard/myPostedJobs/${job?._id}`}
                        className="inline-block px-4 py-1 font-medium rounded-full bg-blue-100 text-blue-600 hover:bg-blue-200"
                      >
                        {job?.applicantsNumber}
                      </Link>

                      </td>
                    <td className="pl-6 py-4 gap-2 px-6 text-center flex justify-center">
                      <Link
                        href={`/dashboard/myPostedJobs/api/update/${job?._id}`}
                        className="flex items-center justify-center gap-1 bg-blue-500 text-white py-1 px-3 rounded-md hover:bg-blue-600 transition"
                      >
                        <AiFillEdit className="text-lg flex items-center justify-center" />
                      </Link>
                      <button
                        className="flex items-center justify-center gap-1 bg-red-500 text-white py-1 px-3 rounded-md hover:bg-red-600 transition mx-2"
                        onClick={() => handleDelete(job?._id)}
                      >
                        <AiFillDelete className="text-lg flex items-center justify-center" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            )
          }

          {/* Pagination  */}
          <div className="flex items-center justify-between bg-gray-50 px-6 py-4 border-t">
            <div className="flex items-center space-x-2">
              <span className="text-gray-700">View</span>
              <select
                value={limit}
                onChange={(e) => {
                  setLimit(parseInt(e.target.value)), setPage(1);
                }}
                className="border border-gray-300 rounded-md py-1 px-3"
              >
                <option value="10">10</option>
                <option value="20">20</option>
                <option value="30">30</option>
              </select>
              <span className="text-gray-700 block w-full pr-6">
                Applicants per page
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <button
                disabled={page === 1}
                onClick={() => setPage(page - 1)}
                className={`text-gray-700 ${
                  page === 1 && "cursor-not-allowed"
                }`}
              >
                Previous
              </button>
              <div className="space-x-2 flex">
                {Array.from(
                  { length: Math.ceil(total / limit) },
                  (_, index) => (
                    <button
                      key={index + 1}
                      onClick={() => setPage(index + 1)}
                      className={`btn px-3 py-2 border-2 text-xs  font-semibold hover:border hover:border-hover bg-primary hover:bg-hover rounded-lg ${
                        page === index + 1 ? "bg-primary text-white" : ""
                      }`}
                    >
                      {index + 1}
                    </button>
                  )
                )}
              </div>

              <button
                disabled={page === Math.ceil(total / limit)}
                onClick={() => setPage(page + 1)}
                className={`text-gray-700 ${
                  page === Math.ceil(total / limit) && "cursor-not-allowed"
                }`}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default PostedJobs;

/*

 <div className="max-w-5xl mx-auto py-10 overflow-x-auto">
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
              <th className="py-3 px-6 text-left text-gray-600 font-bold">
                Total Applicants
              </th>

              <th className="py-3 px-6 text-center text-gray-600 font-bold">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(jobs) &&
              jobs.map((job) => (
                <tr key={job?._id} className="hover:bg-gray-50 border-b">
                  <td className="py-3 px-6">{job?.jobTitle}</td>
                  <td className="py-3 px-6">
                    {job?.compnayInforamtion?.companyInfo?.companyName}
                  </td>
                  <td className="py-3 px-6">{job?.jobType}</td>
                  <td className="py-3 px-6 text-center">
                    <Link
                    href={`/dashboard/myPostedJobs/${job?._id}`}
                    className="bg-primary text-white px-5 py-1 rounded-lg"
                    >
                      {job?.applicantsNumber}
                    </Link>
                  </td>
                  <td className="py-3 px-6 text-center flex justify-center gap-2">
                    <Link
                      href={`/dashboard/myPostedJobs/api/update/${job?._id}`}
                      className="flex items-center justify-center gap-1 bg-blue-500 text-white py-1 px-3 rounded-md hover:bg-blue-600 transition"
                    >
                      <AiFillEdit className="text-lg flex items-center justify-center" />
                    </Link>
                    <button
                      className="flex items-center justify-center gap-1 bg-red-500 text-white py-1 px-3 rounded-md hover:bg-red-600 transition mx-2"
                      onClick={() => handleDelete(job?._id)}
                    >
                      <AiFillDelete className="text-lg flex items-center justify-center" />
                    </button>
                    <button
                      className="flex items-center justify-center gap-1 bg-green-500 text-white py-1 px-3 rounded-md hover:bg-green-600 transition"
                      onClick={() =>
                        (window.location.href = `/jobs/${job?._id}`)
                      }
                    >
                      <AiFillEye className="text-lg flex items-center justify-center" />
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      )}
    </div>

*/

/*



*/
