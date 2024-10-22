"use client";
import Loader from '@/app/loading';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { FaReact } from 'react-icons/fa';
import { MdBookmarkRemove, MdOutlineRemoveRedEye } from 'react-icons/md';
import Link from 'next/link';
import Swal from 'sweetalert2';
import toast from 'react-hot-toast';

const JobListTable = () => {
    const [loading, setLoading] = useState(true);
    const session = useSession();
    const [jobData, setJobData] = useState([]);
    const [selectedStatus, setSelectedStatus] = useState("");
    const [selectedType, setSelectedType] = useState("");
    const [searchQuery, setSearchQuery] = useState("");
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [total, setTotal] = useState(1);
    const [reFetch, setReFetch] = useState(true)
    const today = new Date();
    const email = session?.data?.user?.email;

    useEffect(() => {
        const fetchJobs = async () => {
            setLoading(true);
            try {
                const { data } = await axios.get(
                    `${process.env.NEXT_PUBLIC_SITE_ADDRESS}/api/getSaveJobs/${session?.data?.user?.email}`,
                    {
                        params: {
                            status: selectedStatus,
                            jobType: selectedType,
                            search: searchQuery,
                            page,
                            limit,
                        },
                    }
                );
                setJobData(data.jobs);
                setTotal(data.total);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching data: ", error);
                setLoading(false);
            }
        };

        fetchJobs();
    }, [session?.data?.user?.email, selectedStatus, selectedType, searchQuery, page, limit, reFetch]);


    const handleDelete = async (jobId, id, job) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Remove it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const removeSaveInfo = job?.saveUsers?.filter(e => e !== email);

                    const { data } = await axios.put(
                        `${process.env.NEXT_PUBLIC_SITE_ADDRESS}/dashboard/myPostedJobs/api/postedJobs/${id}`,
                        { saveUsers: removeSaveInfo }
                    );
                    if (data?.response?.modifiedCount > 0) {
                        const { data } = await axios.delete(`/api/deleteSavedJob/${jobId}`); // Correct endpoint for DELETE
                        if (data.deletedCount > 0) {
                            // delete save user email
                            toast.success('Your Job has been Removed')
                            setReFetch(!reFetch)
                        }
                    }
                } catch (error) {
                    Swal.fire({
                        title: "Error!",
                        text: error,
                        icon: "error"
                    });
                    console.error("Error deleting job: ", error);
                }
            }
        });


    };


    const handleSearch = (e) => {
        setSearchQuery(e.target.value)
        setPage(1); // Reset to first page on new search
    };

    return (
        <div className="max-w-7xl mx-auto py-8 px-4">
            {/* Page Title */}
            <h1 className="text-2xl font-bold text-center mb-8">Saved Jobs</h1>

            {/* Filter Section */}
            <div className="mb-6 p-4 bg-white rounded-lg shadow-md flex items-center justify-between">
                <div className="flex flex-col md:flex-row justify-between gap-4 w-full">
                    <select
                        value={selectedStatus}
                        onChange={(e) => setSelectedStatus(e.target.value)}
                        className="border border-gray-300 rounded-md py-2 w-full px-4 focus:outline-none focus:ring focus:border-blue-300"
                    >
                        <option disabled value="">Filter by Status</option>
                        <option value="">All</option>
                        <option value="Live">Live</option>
                        <option value="Closed">Closed</option>
                    </select>

                    <select
                        value={selectedType}
                        onChange={(e) => setSelectedType(e.target.value)}
                        className="border border-gray-300 rounded-md py-2 px-4 w-full focus:outline-none focus:ring focus:border-blue-300"
                    >
                        <option disabled value="">Filter by Job Type</option>
                        <option value="">All</option>
                        <option value="Full-Time">Full-Time</option>
                        <option value="Part-Time">Part-Time</option>
                        <option value="Contract-Based">Contract-Based</option>
                    </select>

                    <div className="flex gap-2 w-full">
                        <input
                            type="text"
                            placeholder="Search by job title..."
                            value={searchQuery}
                            onChange={(e) => handleSearch(e)}
                            className="border w-full border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring focus:border-blue-300"
                        />
                    </div>
                </div>
            </div>

            {/* Table */}
            <div className="overflow-x-scroll border rounded-lg shadow-md">
                {
                    loading ? <Loader /> : <table className="min-w-full bg-white">
                        {/* Table Header */}
                        <thead className="bg-gray-50 border-b">
                            <tr>
                                <th className="px-6 py-4 text-left font-medium text-gray-700">#</th>
                                <th className="px-6 py-4 text-left font-medium text-gray-700">Job Title</th>
                                <th className="px-6 py-4 text-left font-medium text-gray-700">Job Status</th>
                                <th className="px-6 py-4 text-left font-medium text-gray-700">Location Type</th>
                                <th className="px-6 py-4 text-left font-medium text-gray-700">Job Type</th>
                                <th className="px-6 py-4 text-left font-medium text-gray-700">Vacancy</th>
                                <th className="px-6 py-4 text-left font-medium text-gray-700">Job Deadline</th>
                                <th className="px-6 py-4 font-medium text-gray-700">Actions</th>
                            </tr>
                        </thead>

                        {/* Table Body */}
                        <tbody>
                            {jobData?.map((job, index) => (
                                <tr key={index} className="border-b hover:bg-gray-50 text-xs md:text-sm">
                                    <td className="px-6 py-4">{index + 1}</td>
                                    <td className="px-1 md:px-3 lg:px-6 py-4 flex items-center gap-2 hover:underline">
                                        <Link href={`/jobs/${job?.job?._id}`}>
                                            {job.job?.jobTitle}
                                        </Link>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span
                                            className={`inline-block px-2 py-1 font-medium rounded-full ${new Date(job?.job?.deadline) > today
                                                ? 'bg-green-100 text-green-600'
                                                : 'bg-red-100 text-red-600'
                                                }`}
                                        >
                                            {
                                                new Date(job?.job?.deadline) > today ? "Live" : "Closed"
                                            }
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">{job.job?.locationType}</td>
                                    <td className="px-1 md:px-3 lg:px-6 py-4">
                                        <span className="inline-block px-2 py-1 font-medium rounded-full bg-blue-100 text-blue-600">
                                            {job.job?.jobType}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="inline-block px-2 py-1 font-medium rounded-full bg-green-100 text-green-600">
                                            {job.job?.vacancy}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">{new Date(job.job?.deadline).toLocaleDateString()}</td>
                                    <td className="pl-6 py-4 text-center">
                                        <button
                                            onClick={() => {
                                                handleDelete(job?._id, job?.job?._id, job?.job)
                                            }}
                                            className="flex items-center justify-center gap-1 bg-red-500 text-white py-1 px-3 rounded-md hover:bg-red-600 transition mx-2"
                                        >
                                            <MdBookmarkRemove className="text-lg flex items-center justify-center" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                }


                {/* Pagination */}
                <div className="flex items-center justify-between bg-gray-50 px-6 py-4 border-t">
                    <div className="flex items-center space-x-2">
                        <span className="text-gray-700">View</span>
                        <select value={limit} onChange={(e) => setLimit(parseInt(e.target.value))} className="border border-gray-300 rounded-md py-1 px-3">
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
        </div >
    );
};

export default JobListTable;
