"use client";
import Loader from '@/app/loading';
import axios from 'axios';
import React, { Fragment, useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { MdOutlineCancel, MdOutlineRemoveRedEye } from 'react-icons/md';
import Link from 'next/link';
import Swal from 'sweetalert2';
import Modal from '@/components/Modal/Modal';
import toast from 'react-hot-toast';
import { TbFidgetSpinner } from 'react-icons/tb';

const ApplyedJobs = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const session = useSession();
  const [jobs, setJobs] = useState([]);
  const [sort, setSort] = useState('');
  const [search, setSearch] = useState('');
  const [jobType, setJobType] = useState('');
  const [id, setId] = useState('');
  // for pagination
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [total, setTotal] = useState(1);
  const [task, setTask] = useState('');

  const fetchJobs = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_SITE_ADDRESS}/jobs/applyedJobApi/${session?.data?.user?.email}`,
        {
          params: {
            jobType,
            sort,
            jobTitle: search,
            page,
            limit
          }
        });
      setJobs(data.jobs);
      setTotal(data.total);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data: ", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, [session?.data?.user?.email, sort, search, jobType, page, limit]);

  // handle Remove Applyed job
  const handleRemove = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to cancel the application?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          // Send DELETE request to the server
          const { data } = await axios.delete(
            `${process.env.NEXT_PUBLIC_SITE_ADDRESS}/jobs/applyedJobApi/deleteApplyedJob/${id}`
          );

          if (data.deletedCount > 0) {
            Swal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success",
            });
            // Re-fetch the jobs after deletion
            fetchJobs();
          }

        } catch (error) {
          // Handle error
          console.log(error);
          Swal.fire({
            title: "Error!",
            text: "Failed to delete the job.",
            icon: "error",
          });
        }
      }
    });
  };

  // TASK Related
  const taskSubmission = async (e) => {
    e.preventDefault();
    const taskSubmissionLink = e.target.taskSubmissionLink.value;

    try {
      setIsLoading(true)
      const { data } = await axios.put(
        `${process.env.NEXT_PUBLIC_SITE_ADDRESS}/jobs/applyedJobApi/deleteApplyedJob/${id}`,
        { task: { taskSubmissionLink, ...task }, jobStatus: 'Submitted' }
      );

      if (data.modifiedCount > 0) {
        setShowModal(!showModal)
        toast.success('Successful')
        setIsLoading(false)
        // Re-fetch the jobs after deletion
        fetchJobs();
      }
      setIsLoading(false)
    } catch (error) {
      // Handle error
      setIsLoading(false)
      setShowModal(!showModal)
      console.log(error.message);
      Swal.fire({
        title: "Error!",
        text: "Failed to delete the job.",
        icon: "error",
      });
    }
  }

  return (
    <Fragment>
      <div className="max-w-7xl mx-auto py-8 px-4">
        {/* Page Title */}
        <h1 className="text-2xl font-bold text-center mb-8">Applyed Jobs</h1>

        {/* Filter Section */}
        <div className="mb-6 p-4 bg-white rounded-lg shadow-md flex items-center justify-between">
          <div className="flex flex-col md:flex-row justify-between gap-4 w-full">

            <select
              onChange={(e) => setJobType(e.target.value)}
              className="border border-gray-300 rounded-md py-2 px-4 w-full focus:outline-none focus:ring focus:border-blue-300"
            >
              <option value="">Filter by Job Status</option>
              <option value="Pending">Pending</option>
              <option value="Submitted">Submitted</option>
              <option value="Task">Task</option>
              <option value="Interview">Interview</option>
              <option value="Rejected">Rejected</option>
            </select>

            <select
              onChange={e => {
                setSort(e.target.value)
              }}
              value={sort}
              name='category'
              id='category'
              className='border border-gray-300 rounded-md py-2 px-4 w-full focus:outline-none focus:ring focus:border-blue-300'
            >
              <option value=''>Sort by Applyed Date</option>
              <option value='dsc'>Descending Order</option>
              <option value='asc'>Ascending Order</option>
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
                onChange={(e) => { setSearch(e.target.value), setPage(1) }}
                className="border w-full border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring focus:border-blue-300"
              />
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto border rounded-lg shadow-md">
          {
            loading ? <Loader /> : <table className="min-w-full bg-white">
              {/* Table Header */}
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-6 py-4 text-left font-medium text-gray-700">#</th>
                  <th className="px-6 py-4 text-left font-medium text-gray-700">Job Title</th>
                  <th className="px-6 py-4 text-left font-medium text-gray-700">Job Status</th>
                  <th className="px-6 py-4 text-left font-medium text-gray-700">Job Type</th>
                  <th className="px-6 py-4 text-left font-medium text-gray-700">Job applyed Date</th>
                  <th className="px-6 py-4 text-center font-medium text-gray-700">Actions</th>
                </tr>
              </thead>

              {/* Table Body */}
              <tbody>
                {jobs?.map((job, index) => (
                  <tr key={index} className="border-b hover:bg-gray-50 text-xs md:text-sm">
                    <td className="px-6 py-4">{index + 1}</td>

                    <td className="px-1 md:px-3 lg:px-6 py-4 flex items-center gap-2">
                      {job?.jobTitle}
                    </td>

                    <td className="px-1 md:px-3 lg:px-6 py-4 text-center">
                      <span
                        onClick={() => {
                          if (job?.jobStatus === 'Pending') {
                            return toast.error('This job is pending')
                          }
                          else if (job?.jobStatus === 'Submitted') {
                            return toast.error('Already task is submitted')
                          }
                          else if (job?.jobStatus === 'Task') {
                            setShowModal(!showModal)
                            setId(job?._id)
                            setTask(job?.task)
                          }
                        }}
                        className={`${job?.jobStatus === 'Pending' ? 'bg-blue-100 text-blue-600' : job?.jobStatus === 'Rejected ' ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600'} cursor-pointer inline-block px-2 py-1 font-medium rounded-full `}>
                        {job?.jobStatus}
                      </span>
                    </td>

                    <td className="px-6 py-4">{job?.jobType}</td>

                    <td className="px-6 py-4">{new Date(job?.applicationDate).toLocaleDateString()}</td>
                    <td className="pl-6 py-4 text-right flex gap-2">
                      <button
                        onClick={() => handleRemove(job?._id)}
                        className="flex items-center justify-center gap-1 bg-red-500 text-white py-1 px-3 rounded-md hover:bg-red-600 transition mx-2"
                      >
                        <MdOutlineCancel className="text-lg flex items-center justify-center" />
                      </button>
                      <Link href={`/jobs/${job?.jobId}`}>
                        <button
                          className="flex items-center justify-center gap-1 bg-green-500 text-white py-1 px-3 rounded-md hover:bg-green-600 transition"
                        >
                          <MdOutlineRemoveRedEye className="text-lg flex items-center justify-center" />
                        </button>
                      </Link>
                    </td>

                    {/* Modal */}
                    <Modal isVisible={showModal} showModal={showModal} setShowModal={setShowModal}>
                      <div>
                        <form onSubmit={taskSubmission}>
                          <p>You are given a TASK to pass to the next step.Please Do it before {new Date(task?.submissionDate).toLocaleDateString()}
                            <a href={task?.taskLink} target='_blank' className='text-blue-600 font-semibold'> Task Link</a>
                          </p>
                          <div className='space-y-4 mt-4'>

                            <input
                              placeholder="Submit job task link"
                              name='taskSubmissionLink'
                              type='text'
                              required
                              className='block w-full px-4 py-2 mt-2 bg-white border border-gray-200 rounded-md  focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40  focus:outline-none focus:ring'
                            />

                            <div className='flex justify-end md:col-span-2'>
                              <button className='py-2 px-6 text-lg font-medium text-white bg-[#2557a7] rounded-md hover:bg-[#0d2d5e]'>
                                {isLoading ? <TbFidgetSpinner className='animate-spin m-auto' /> : 'Submit'}
                              </button>
                            </div>
                          </div>
                        </form>
                      </div>
                    </Modal>

                  </tr>
                ))}
              </tbody>
            </table>
          }

          {/* Pagination */}
          <div className="flex items-center justify-between bg-gray-50 px-6 py-4 border-t">
            <div className="flex items-center space-x-2">
              <span className="text-gray-700">View</span>
              <select value={limit} onChange={(e) => { setLimit(parseInt(e.target.value)), setPage(1) }} className="border border-gray-300 rounded-md py-1 px-3">
                <option value="10">10</option>
                <option value="20">20</option>
                <option value="30">30</option>
              </select>
              <span className="text-gray-700 block w-full pr-6">Applicants per page</span>
            </div>
            <div className="flex items-center space-x-2">
              <button disabled={page === 1} onClick={() => setPage(page - 1)} className={`text-gray-700 ${page === 1 && 'cursor-not-allowed'}`}>Previous</button>
              <div className="space-x-2 flex">
                {Array.from({ length: Math.ceil(total / limit) }, (_, index) => (
                  <button
                    key={index + 1}
                    onClick={() => setPage(index + 1)}
                    className={`btn px-3 py-2 border-2 text-xs  font-semibold hover:border hover:border-sky-700 bg-sky-300 hover:bg-sky-400 rounded-lg ${page === index + 1 ? "bg-sky-500 text-white" : ""
                      }`}
                  >
                    {index + 1}
                  </button>
                ))}
              </div>

              <button disabled={page === Math.ceil(total / limit)} onClick={() => setPage(page + 1)} className={`text-gray-700 ${page === Math.ceil(total / limit) && 'cursor-not-allowed'}`}>Next</button>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default ApplyedJobs;