"use client";
import Loader from '@/app/loading';
import axios from 'axios';
import React, { Fragment, useEffect, useState } from 'react';
import { MdInterpreterMode, MdOutlineCancel, MdOutlineRemoveRedEye } from 'react-icons/md';
import Link from 'next/link';
import Swal from 'sweetalert2';
import { GiNotebook } from 'react-icons/gi';
import toast from 'react-hot-toast';
import { TbFidgetSpinner } from 'react-icons/tb';
import Modal from '@/components/Modal/Modal';
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";

const ApplyedAJob = ({ params }) => {
    const [isLoading, setIsLoading] = useState(false)
    const [showModal, setShowModal] = useState(false);
    const [loading, setLoading] = useState(true);
    const [jobs, setJobs] = useState([]);
    // for pagination
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [total, setTotal] = useState(1);
    const [id, setId] = useState('');
    const [task, setTask] = useState('');
    const [interView, setInterView] = useState(false);

    const fetchJobs = async () => {
        setLoading(true);
        try {
            const { data } = await axios.get(
                `${process.env.NEXT_PUBLIC_SITE_ADDRESS}/dashboard/myPostedJobs/api/applyedJob/${[params.id]}`,
                {
                    params: {
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
    }, [params.id, page, limit]);

    // handle Remove Applyed job
    const handleRemove = async (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "Do you want to reject the applicant?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, it!",
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const { data } = await axios.put(
                        `${process.env.NEXT_PUBLIC_SITE_ADDRESS}/jobs/applyedJobApi/deleteApplyedJob/${id}`, { jobStatus: "rejected" });

                    if (data.modifiedCount > 0) {
                        toast.success('Successful')
                        // Re-fetch the jobs after deletion
                        fetchJobs();
                    }
                } catch (error) {
                    // Handle error
                    console.log(error.message);
                    Swal.fire({
                        title: "Error!",
                        text: "Failed to delete the job.",
                        icon: "error",
                    });
                }
            }
        });
    };

    const handleTask = (id) => {
        setShowModal(!showModal)
        setId(id)
        setInterView(false)
    }

    const handleSubmitTask = async (e) => {
        e.preventDefault();
        const form = e.target;
        const taskLink = form.taskLink.value;
        const submissionDate = form.submissionDate.value;

        const task = {
            taskLink,
            submissionDate
        }

        if (!id) {
            return toast.error('Something os Wrong')
        }

        try {
            setIsLoading(true)
            const { data } = await axios.put(
                `${process.env.NEXT_PUBLIC_SITE_ADDRESS}/jobs/applyedJobApi/deleteApplyedJob/${id}`, { task, jobStatus: 'task' });

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

    const handleInterView = (id) => {

    }

    return (
        <Fragment>
            <div className="max-w-7xl mx-auto py-8 px-4">
                {/* Page Title */}
                <h1 className="text-2xl font-bold text-center mb-8">{jobs?.[1]?.jobTitle}</h1>

                {/* Table */}
                <div className="overflow-x-auto border rounded-lg shadow-md">
                    {
                        loading ? <Loader /> : <table className="min-w-full bg-white">
                            {/* Table Header */}
                            <thead className="bg-gray-50 border-b">
                                <tr>
                                    <th className="px-6 py-4 text-left font-medium text-gray-700">#</th>
                                    <th className="px-6 py-4 text-left font-medium text-gray-700">Seeker Email</th>
                                    <th className="px-6 py-4 text-left font-medium text-gray-700">Job applyed Date</th>
                                    <th className="px-6 py-4 text-left font-medium text-gray-700">Job Status</th>
                                    <th className="px-6 py-4 text-left font-medium text-gray-700">Profile</th>
                                    <th className="px-6 py-4 text-center font-medium text-gray-700">Actions</th>
                                </tr>
                            </thead>

                            {/* Table Body */}
                            <tbody>
                                {jobs?.map((job, index) => (
                                    <tr key={index} className="border-b hover:bg-gray-50 text-xs md:text-sm">
                                        <td className="px-6 py-4">{index + 1}</td>

                                        <td className="px-1 md:px-3 lg:px-6 py-4 flex items-center gap-2">
                                            {job?.applicantInfo?.contactInformation?.email}
                                        </td>

                                        <td className="px-6 py-4">{new Date(job?.applicationDate).toLocaleDateString()}</td>

                                        <td className="px-1 md:px-3 lg:px-6 py-4">
                                            <span className={`${job?.jobStatus === 'pending' ? 'bg-blue-100 text-blue-600' : job?.jobStatus === 'rejected' ? 'bg-red-100 text-red-600' : ''} inline-block px-2 py-1 font-medium rounded-full `}>
                                                {job?.jobStatus}
                                            </span>
                                        </td>

                                        <td className="px-6 py-4">
                                            <Link
                                                className='px-4 py-1 bg-primary text-white rounded-xl'
                                                href={`/seekerInfo/${job?.applicantInfo?.contactInformation?.email}`}
                                            >
                                                View
                                            </Link>
                                        </td>

                                        <td className="pl-6 py-4 text-right flex gap-2">
                                            <button
                                                onClick={() => { handleTask(job?._id), setTask(job?.task) }}
                                                className="flex items-center justify-center gap-1 bg-gray-500 text-white py-1 px-3 rounded-md hover:bg-gray-600 transition"
                                            >
                                                <GiNotebook className="text-lg flex items-center justify-center" />
                                            </button>
                                            <button
                                                onClick={() => {
                                                    setShowModal(!showModal)
                                                    setId(id)
                                                    setInterView(true)
                                                }}
                                                className="flex items-center justify-center gap-1 bg-green-500 text-white py-1 px-3 rounded-md hover:bg-green-600 transition"
                                            >
                                                <MdInterpreterMode className="text-lg flex items-center justify-center" />
                                            </button>
                                            <button
                                                disabled={job?.jobStatus === 'rejected'}
                                                onClick={() => handleRemove(job?._id)}
                                                className={`${job?.jobStatus === 'rejected' && 'cursor-not-allowed'} flex items-center justify-center gap-1 bg-red-500 text-white py-1 px-3 rounded-md hover:bg-red-600 transition mr-2`}
                                            >
                                                <MdOutlineCancel className="text-lg flex items-center justify-center" />
                                            </button>
                                        </td>
                                        {/* Modal */}
                                        {
                                            interView ? <>
                                                <Modal isVisible={showModal} showModal={showModal} setShowModal={setShowModal}>
                                                    <div>
                                                        <Tabs>
                                                            <TabList className="flex justify-center items-center">
                                                                <Tab className="mr-2 p-2 cursor-pointer" selectedClassName="bg-primary p-2 rounded text-white border-0">
                                                                    Offline
                                                                </Tab>
                                                                <Tab className="mr-2 p-2 cursor-pointer" selectedClassName="bg-primary p-2 rounded text-white border-0">
                                                                    Online
                                                                </Tab>
                                                            </TabList>

                                                            <TabPanel>
                                                               <div>

                                                               </div>
                                                            </TabPanel>

                                                            <TabPanel>
                                                                <div>

                                                                </div>
                                                            </TabPanel>
                                                        </Tabs>
                                                    </div>
                                                </Modal>
                                            </> : <>
                                                <Modal isVisible={showModal} showModal={showModal} setShowModal={setShowModal}>
                                                    {task?.taskSubmissionLink ? <>
                                                        <div>
                                                            <h1 className='text-center text-lg'>This job seeker already submit his task || <a href={task?.taskSubmissionLink} target='_blank' className='text-blue-600 font-semibold'>Submission Link</a></h1>
                                                        </div>
                                                    </>
                                                        :
                                                        <>
                                                            <form onSubmit={handleSubmitTask}>
                                                                <div className='flex flex-col gap-3'>
                                                                    <div className="">
                                                                        <label className='font-medium' htmlFor='job_title'>
                                                                            Last date for task submission
                                                                        </label>
                                                                        <input
                                                                            defaultValue={job?.task?.submissionDate}
                                                                            name='submissionDate'
                                                                            type='date'
                                                                            required
                                                                            className='block w-full px-4 py-2 mt-2 bg-white border border-gray-200 rounded-md  focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40  focus:outline-none focus:ring'
                                                                        />
                                                                    </div>

                                                                    <div className="">
                                                                        <label className='font-medium' htmlFor='job_title'>
                                                                            Task Link
                                                                        </label>
                                                                        <input
                                                                            placeholder="Submit job task link"
                                                                            defaultValue={job?.task?.taskLink} name='taskLink'
                                                                            type='text'
                                                                            required
                                                                            className='block w-full px-4 py-2 mt-2 bg-white border border-gray-200 rounded-md  focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40  focus:outline-none focus:ring'
                                                                        />
                                                                    </div>

                                                                    <div className='flex justify-end md:col-span-2'>
                                                                        <button className='py-2 px-6 text-lg font-medium text-white bg-[#2557a7] rounded-md hover:bg-[#0d2d5e]'>
                                                                            {isLoading ? <TbFidgetSpinner className='animate-spin m-auto' /> : 'Submit'}
                                                                        </button>
                                                                    </div>
                                                                </div>
                                                            </form>
                                                        </>
                                                    }
                                                </Modal>
                                            </>
                                        }



                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    }

                    {/* Pagination */}
                    <div className="flex min-w-full items-center justify-between bg-gray-50 px-6 py-4 border-t">
                        <div className="flex items-center space-x-2">
                            <span className="text-gray-700">View</span>
                            <select value={limit} onChange={(e) => { setLimit(parseInt(e.target.value)), setPage(1) }} className="border border-gray-300 rounded-md py-1 px-3">
                                <option value="10">10</option>
                                <option value="20">20</option>
                                <option value="30">30</option>
                            </select>
                            <span className="text-gray-700 block w-full pr-6">Seekers per page</span>
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

export default ApplyedAJob;