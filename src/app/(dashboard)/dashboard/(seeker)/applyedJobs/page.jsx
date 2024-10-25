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
  const [jobStatus, setJobStatus] = useState('');
  const [id, setId] = useState('');
  // for pagination
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [total, setTotal] = useState(1);
  const [task, setTask] = useState('');
  const [onlineInterView, setOnlineInterView] = useState([]);
  const [offlineInterView, setOfflineInterView] = useState([]);
  const [status, setStatus] = useState('')  // for modal problem

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
            jobStatus,
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
  }, [session?.data?.user?.email, sort, search, jobType, jobStatus, page, limit]);


  // handle Remove Applyed job
  const handleRemove = async (id, job_Id) => {
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
            await axios.put(`/api/applicantCountDecrease/${job_Id}`);

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
      <div className="max-w-7xl mx-auto pb-5 md:py-8 md:px-4">
        {/* Page Title */}
        <h1 className="text-2xl font-bold text-center mb-5 md:mb-8">Applyed Jobs</h1>

        {/* Filter Section */}
        <div className="mb-6 md:p-4 bg-white rounded-lg shadow-md flex items-center justify-between">
          <div className="flex flex-col md:flex-row justify-between gap-4 w-full">

            <select
              onChange={(e) => setJobStatus(e.target.value)}
              className="border border-gray-300 rounded-md py-2 px-4 w-full focus:outline-none focus:ring focus:border-blue-300"
            >
              <option value="">Filter by Job Status</option>
              <option value="Selected">Selected</option>
              <option value="Pending">Pending</option>
              <option value="Task">Task</option>
              <option value="Interview">Interview</option>
              <option value="Submitted">Submitted</option>
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
                  <th className="px-6 py-4 text-left font-medium text-gray-700">Job Type</th>
                  <th className="px-6 py-4 font-medium text-gray-700">Job applyed Date</th>
                  <th className="px-6 py-4 font-medium text-gray-700">Job Status</th>
                  <th className="px-6 py-4 text-center font-medium text-gray-700">Actions</th>
                </tr>
              </thead>

              {/* Table Body */}
              <tbody>
                {jobs?.map((job, index) => (
                  <tr key={index} className="border-b hover:bg-gray-50 text-xs md:text-sm">
                    <td className="px-6 py-4">{index + 1}</td>
                    <td className="px-1 md:px-3 lg:px-6 py-4 flex items-center gap-2 hover:underline">
                      <Link href={`/jobs/${job?.jobId}`}>
                        {job?.jobTitle}
                      </Link>
                    </td>
                    <td className="px-6 py-4">{job?.jobType}</td>
                    <td className="px-6 py-4 text-center">{new Date(job?.applicationDate).toLocaleDateString()}</td>
                    {/* job Status */}
                    <td className="px-1 md:px-3 lg:px-6 py-4 text-center">
                      <span
                        onClick={() => {
                          setStatus(job?.jobStatus)
                          if (job?.jobStatus === 'Pending') {
                            return toast.loading('This job is pending..!',
                              {
                                duration: 3000,
                                style: {
                                  background: '#2557a7',
                                  color: '#fff',
                                },
                              }
                            )

                          }
                          else if (job?.jobStatus === 'Submitted') {
                            return toast('Already task is submitted..!',
                              {
                                icon: '👏',
                                style: {
                                  background: '#2557a7',
                                  color: '#fff',
                                },
                              }
                            );
                          }

                          else if (job?.jobStatus === 'Rejected') {
                            return toast('You have been rejected for this job..!',
                              {
                                icon: '😥',
                                style: {
                                  background: '#fff',
                                  color: 'red',
                                },
                              }
                            );
                          }

                          else {
                            setOfflineInterView(job?.offlineInterView)
                            setOnlineInterView(job?.onlineInterView)
                            setShowModal(!showModal)
                            setId(job?._id)
                            setTask(job?.task)
                          }
                        }}
                        className={`${job?.jobStatus === 'Pending' ? 'bg-blue-100 text-blue-600' : job?.jobStatus === 'Rejected ' ? 'bg-red-100 text-red-600' : 'bg-gradient-to-r from-[#6ec49a]  via-[#71d097]  text-green-700'} cursor-pointer px-2 py-1 font-medium rounded-full `}>
                        {job?.jobStatus}
                      </span>
                    </td>
                    <td className="pl-6 py-4 gap-2">
                      <button
                        onClick={() => {
                          handleRemove(job?._id, job?.jobId)
                        }}
                        className="flex items-center justify-center gap-1 bg-red-500 text-white py-1 px-3 rounded-md hover:bg-red-600 transition mx-2"
                      >
                        <MdOutlineCancel className="text-lg flex items-center justify-center" />
                      </button>
                    </td>
                    {/* Modal */}
                    {
                      status === 'Task' &&
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
                    }
                    {
                      status === 'Selected' &&
                      <Modal isVisible={showModal} showModal={showModal} setShowModal={setShowModal}>
                        <div>
                          {job?.offerLetter} <a target='_blank' href={job?.offerLetterLink} className='text-hover font-medium'>Link</a>
                        </div>
                      </Modal>
                    }
                    {/* modal for interview  */}
                    {
                      status === 'Interview' &&
                      <Modal isVisible={showModal} showModal={showModal} setShowModal={setShowModal}>
                        <div className={`${offlineInterView && 'hidden'}`}>
                          <h2 className="text-2xl font-bold text-gray-800 text-center">Online Interview</h2>
                          <div className="space-y-4 mt-5">
                            <div className="flex justify-between items-center">
                              <span className="text-gray-600 font-medium">Date:</span>
                              <span className="text-gray-800">{onlineInterView?.interviewDate}</span>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="text-gray-600 font-medium">Time:</span>
                              <span className="text-gray-800">{onlineInterView?.interviewTime}</span>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="text-gray-600 font-medium">Contact Person:</span>
                              <span className="text-gray-800">{onlineInterView?.contact?.contactPerson}</span>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="text-gray-600 font-medium">Contact Phone:</span>
                              <span className="text-gray-800">{onlineInterView?.contact?.contactPhone}</span>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="text-gray-600 font-medium">Contact Email:</span>
                              <span className="text-gray-800">{onlineInterView?.contact?.contactEmail}</span>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="text-gray-600 font-medium">Format:</span>
                              <span className="text-gray-800">{onlineInterView?.interviewFormat}</span>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="text-gray-600 font-medium">Meeting Link:</span>
                              <a
                                href={onlineInterView?.meetingLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-500 underline"
                              >
                                Join Google Meet
                              </a>
                            </div>
                          </div>
                        </div>

                        <div className={`${onlineInterView && 'hidden'}`}>
                          <h2 className="text-2xl font-bold text-gray-800 text-center">Offline Interview</h2>
                          <div className="space-y-4 mt-5">
                            <div className="flex justify-between items-center">
                              <span className="text-gray-600 font-medium">Date:</span>
                              <span className="text-gray-800">{offlineInterView?.interviewDate}</span>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="text-gray-600 font-medium">Time:</span>
                              <span className="text-gray-800">{offlineInterView?.interviewTime}</span>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="text-gray-600 font-medium">Location:</span>
                              <span className="text-gray-800">{offlineInterView?.interviewlocation}</span>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="text-gray-600 font-medium">Contact Person:</span>
                              <span className="text-gray-800">{offlineInterView?.contact?.contactPerson}</span>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="text-gray-600 font-medium">Contact Phone:</span>
                              <span className="text-gray-800">{offlineInterView?.contact?.contactPhone}</span>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="text-gray-600 font-medium">Contact Email:</span>
                              <span className="text-gray-800">{offlineInterView?.contact?.contactEmail}</span>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="text-gray-600 font-medium">Format:</span>
                              <span className="text-gray-800">{offlineInterView?.interviewFormat}</span>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="text-gray-600 font-medium">Documents:</span>
                              <span className="text-gray-800">{offlineInterView?.documents}</span>
                            </div>
                          </div>
                        </div>
                      </Modal>
                    }
                  </tr>
                ))}
              </tbody>
            </table>
          }

          {/* Pagination  */}
          <div className="flex items-center justify-between bg-gray-50 md:px-6 py-4 border-t">
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
                className={`${page === 1 ? "cursor-not-allowed text-gray-400" : "text-gray-700"
                  }`}
              >
                <span className="sr-only">Prev Page</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="size-6"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
              <div className="space-x-2 flex">
                <p className="text-base text-gray-900">
                  {page}
                  <span className="mx-0.25">/</span>
                  {Math.ceil(total / limit)}
                </p>
              </div>

              <button
                disabled={page === Math.ceil(total / limit)}
                onClick={() => setPage(page + 1)}
                className={`${page === Math.ceil(total / limit) ? "cursor-not-allowed text-gray-400" : "text-gray-700 "
                  }`}
              >
                <span className="sr-only">Next Page</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="size-6"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </Fragment >
  );
};

export default ApplyedJobs;