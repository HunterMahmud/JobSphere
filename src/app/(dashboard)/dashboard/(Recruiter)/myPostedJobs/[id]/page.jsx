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
import { gapi } from 'gapi-script';
import { useSession } from 'next-auth/react';

const ApplyedAJob = ({ params }) => {
    const session = useSession();
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
    const email = session?.data?.user?.email;
    const [to, setTo] = useState('')

    const CLIENT_ID = process.env.NEXT_PUBLIC_CLIENT_ID;
    const API_KEY = process.env.NEXT_PUBLIC_API_KEY;
    const DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"];
    const SCOPES = "https://www.googleapis.com/auth/calendar.events";

    const [formData, setFormData] = useState({
        interviewDate: '',
        interviewTime: '',
        contactPerson: '',
        contactEmail: '',
        contactPhone: '',
        interviewFormat: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Load the Google API client
    useEffect(() => {
        function start() {
            gapi.client.init({
                apiKey: API_KEY,
                clientId: CLIENT_ID,
                discoveryDocs: DISCOVERY_DOCS,
                scope: SCOPES,
            });
        }
        gapi.load("client:auth2", start);
    }, []);

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
                        `${process.env.NEXT_PUBLIC_SITE_ADDRESS}/jobs/applyedJobApi/deleteApplyedJob/${id}`, { jobStatus: "Rejected" });

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
                `${process.env.NEXT_PUBLIC_SITE_ADDRESS}/jobs/applyedJobApi/deleteApplyedJob/${id}`, { task, jobStatus: 'Task' });

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
    // for Offline interview
    const handleOfflineInterView = async (e) => {
        e.preventDefault();
        const form = e.target;
        const date = form.date.value;
        const time = form.time.value;
        const location = form.location.value;
        const contactPerson = form.contactPerson.value;
        const contactEmail = form.contactEmail.value;
        const contactPhone = form.contactPhone.value;
        const interviewFormat = form.interviewFormat.value;
        const documents = form.documents.value;

        const offlineInterView = {
            interviewDate: date,
            interviewTime: time,
            interviewlocation: location,
            contact: {
                contactPerson,
                contactPhone,
                contactEmail
            },
            interviewFormat,
            documents
        }

        console.log(offlineInterView);
        if (!id) {
            return toast.error('Something os Wrong')
        }

        try {
            setIsLoading(true)
            const { data } = await axios.put(
                `${process.env.NEXT_PUBLIC_SITE_ADDRESS}/jobs/applyedJobApi/deleteApplyedJob/${id}`, { offlineInterView, jobStatus: 'Interview' });

            if (data.modifiedCount > 0) {
                setShowModal(!showModal)
                const { data } = await axios.post('/dashboard/myPostedJobs/api/sendEmail/offlineInterView', { offlineInterView, from: email, to });
                console.log(data)
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
    // for online interview
    const handleOnlineInterview = async (e) => {
        e.preventDefault();
        const isSignedIn = gapi.auth2.getAuthInstance().isSignedIn.get();

        if (!isSignedIn) {
            await gapi.auth2.getAuthInstance().signIn();
        }

        // Create Google Calendar Event
        const event = {
            summary: 'Interview with ' + formData.contactPerson,
            description: 'This is an online interview.',
            start: {
                dateTime: `${formData.interviewDate}T${formData.interviewTime}:00`,
                timeZone: 'Asia/Dhaka',
            },
            end: {
                dateTime: `${formData.interviewDate}T${parseInt(formData.interviewTime.split(":")[0]) + 1}:${formData.interviewTime.split(":")[1]}:00`,
                timeZone: 'Asia/Dhaka',
            },
            attendees: [{ email: formData.contactEmail }],
            conferenceData: {
                createRequest: {
                    requestId: "sample123", // This should be unique per request
                    conferenceSolutionKey: { type: "hangoutsMeet" },
                    status: { statusCode: "success" },
                },
            },
        };

        try {
            setIsLoading(true);
            const { result } = await gapi.client.calendar.events.insert({
                calendarId: "primary",
                resource: event,
                conferenceDataVersion: 1, // Ensure conference data is requested
            });

            // Ensure the event is created and contains a hangout link
            if (result && result.hangoutLink) {
                const meetLink = result.hangoutLink; // Use the meet link directly

                const onlineInterView = {
                    interviewDate: formData.interviewDate,
                    interviewTime: formData.interviewTime,
                    contact: {
                        contactPerson: formData.contactPerson,
                        contactPhone: formData.contactPhone,
                        contactEmail: formData.contactEmail,
                    },
                    interviewFormat: formData.interviewFormat,
                    meetingLink: meetLink, // Directly use the link here
                };

                // Proceed to update the job status with the created meeting link
                const { data } = await axios.put(
                    `${process.env.NEXT_PUBLIC_SITE_ADDRESS}/jobs/applyedJobApi/deleteApplyedJob/${id}`,
                    { onlineInterView, jobStatus: 'Interview' }
                );

                if (data.modifiedCount > 0) {
                    setShowModal(!showModal);
                    toast.success('Job interview successfully scheduled!');
                    const { data: hello } = await axios.post('/dashboard/myPostedJobs/api/sendEmail/onlineInterView', { onlineInterView, from: email, to });
                    console.log(hello)
                    // fetchJobs(); // Fetch updated jobs list
                } else {
                    toast.error('No jobs were updated.');
                }



            } else {
                throw new Error("Google Meet link was not returned. Please try again.");
            }
        } catch (err) {
            console.error("Error creating event: ", err.message);
            toast.error(err.message || "Failed to create the event.");
        } finally {
            setIsLoading(false); // Reset loading state
        }
    };




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
                                            <span className={`${job?.jobStatus === 'Pending' ? 'bg-blue-100 text-blue-600' : job?.jobStatus === 'Rejected' ? 'bg-red-100 text-red-600' : ''} inline-block px-2 py-1 font-medium rounded-full `}>
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
                                                onClick={() => {
                                                    if (job?.jobStatus === 'Interview') {
                                                        return toast.error('Allready selected for interview')
                                                    } else {
                                                        handleTask(job?._id)
                                                        setTask(job?.task)
                                                    }
                                                }}
                                                className="flex items-center justify-center gap-1 bg-gray-500 text-white py-1 px-3 rounded-md hover:bg-gray-600 transition"
                                            >
                                                <GiNotebook className="text-lg flex items-center justify-center" />
                                            </button>
                                            <button
                                                onClick={() => {
                                                    if (job?.offlineInterView || job?.onlineInterview) {
                                                        return toast.error('Already Added')
                                                    } else {
                                                        setShowModal(!showModal)
                                                        setId(job?._id)
                                                        setTo(job?.applicantInfo?.contactInformation?.email)
                                                        setInterView(true)
                                                    }
                                                }}
                                                className="flex items-center justify-center gap-1 bg-green-500 text-white py-1 px-3 rounded-md hover:bg-green-600 transition"
                                            >
                                                <MdInterpreterMode className="text-lg flex items-center justify-center" />
                                            </button>
                                            <button
                                                disabled={job?.jobStatus === 'Rejected'}
                                                onClick={() => handleRemove(job?._id)}
                                                className={`${job?.jobStatus === 'Rejected' && 'cursor-not-allowed'} flex items-center justify-center gap-1 bg-red-500 text-white py-1 px-3 rounded-md hover:bg-red-600 transition mr-2`}
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
                                                                    Offline InterView
                                                                </Tab>
                                                                <Tab className="mr-2 p-2 cursor-pointer" selectedClassName="bg-primary p-2 rounded text-white border-0">
                                                                    Online InterView
                                                                </Tab>
                                                            </TabList>

                                                            <TabPanel>
                                                                <div className="mt-5 overflow-y-auto h-[80vh] md:h-[500px]">
                                                                    <h2 className="text-xl md:text-2xl font-bold mb-6 text-center">Interview Details Form</h2>
                                                                    <form onSubmit={handleOfflineInterView} className="md:grid grid-cols-1 md:grid-cols-2 gap-5 bg-white rounded">

                                                                        {/* Date and Time */}
                                                                        <div className="mb-4">
                                                                            <label className="block text-gray-700 font-bold mb-2">Interview Date</label>
                                                                            <input
                                                                                type="date"
                                                                                name="date"
                                                                                className="block w-full px-4 py-2 mt-2 bg-white border border-gray-200 rounded-md  focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40  focus:outline-none focus:ring"
                                                                                required
                                                                            />
                                                                        </div>

                                                                        <div className="mb-4">
                                                                            <label className="block text-gray-700 font-bold mb-2">Interview Time</label>
                                                                            <input
                                                                                type="time"
                                                                                name="time"
                                                                                className="block w-full px-4 py-2 mt-2 bg-white border border-gray-200 rounded-md  focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40  focus:outline-none focus:ring"
                                                                                required
                                                                            />
                                                                        </div>

                                                                        {/* Location */}
                                                                        <div className="mb-4">
                                                                            <label className="block text-gray-700 font-bold mb-2">Interview Location</label>
                                                                            <input
                                                                                type="text"
                                                                                name="location"
                                                                                placeholder="Office Address"
                                                                                className="block w-full px-4 py-2 mt-2 bg-white border border-gray-200 rounded-md  focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40  focus:outline-none focus:ring"
                                                                                required
                                                                            />
                                                                        </div>

                                                                        {/* Contact Information */}
                                                                        <div className="mb-4">
                                                                            <label className="block text-gray-700 font-bold mb-2">Contact Person</label>
                                                                            <input
                                                                                type="text"
                                                                                name="contactPerson"
                                                                                placeholder="HR or Recruiter's Name"
                                                                                className="block w-full px-4 py-2 mt-2 bg-white border border-gray-200 rounded-md  focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40  focus:outline-none focus:ring"
                                                                                required
                                                                            />
                                                                        </div>

                                                                        <div className="mb-4">
                                                                            <label className="block text-gray-700 font-bold mb-2">Contact Email</label>
                                                                            <input
                                                                                type="email"
                                                                                name="contactEmail"
                                                                                placeholder="example@email.com"
                                                                                className="block w-full px-4 py-2 mt-2 bg-white border border-gray-200 rounded-md  focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40  focus:outline-none focus:ring"
                                                                                required
                                                                            />
                                                                        </div>

                                                                        <div className="mb-4">
                                                                            <label className="block text-gray-700 font-bold mb-2">Contact Phone</label>
                                                                            <input
                                                                                type="tel"
                                                                                name="contactPhone"
                                                                                placeholder="Phone Number"
                                                                                className="block w-full px-4 py-2 mt-2 bg-white border border-gray-200 rounded-md  focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40  focus:outline-none focus:ring"
                                                                                required
                                                                            />
                                                                        </div>

                                                                        {/* Interview Format */}
                                                                        <div className="mb-4">
                                                                            <label className="block text-gray-700 font-bold mb-2">Interview Format</label>
                                                                            <input
                                                                                type="text"
                                                                                name="interviewFormat"
                                                                                placeholder="Technical Test, Panel Interview, etc."
                                                                                className="block w-full px-4 py-2 mt-2 bg-white border border-gray-200 rounded-md  focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40  focus:outline-none focus:ring"
                                                                                required
                                                                            />
                                                                        </div>

                                                                        {/* Documents to Bring */}
                                                                        <div className="mb-4">
                                                                            <label className="block text-gray-700 font-bold mb-2">Documents to Bring</label>
                                                                            <input
                                                                                type="text"
                                                                                name="documents"
                                                                                placeholder="Resume, ID, Portfolio"
                                                                                className="block w-full px-4 py-2 mt-2 bg-white border border-gray-200 rounded-md  focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40  focus:outline-none focus:ring"
                                                                                required
                                                                            />
                                                                        </div>

                                                                        {/* Submit Button */}
                                                                        <div className='flex justify-end md:col-span-2'>
                                                                            <button className='py-2 px-6 text-lg font-medium text-white bg-[#2557a7] rounded-md hover:bg-[#0d2d5e]'>
                                                                                {isLoading ? <TbFidgetSpinner className='animate-spin m-auto' /> : 'Submit'}
                                                                            </button>
                                                                        </div>
                                                                    </form>
                                                                </div>
                                                            </TabPanel>

                                                            <TabPanel>
                                                                <div className="mt-5 overflow-y-auto h-[80vh] md:h-[500px]">

                                                                    <h2 className="text-xl md:text-2xl font-bold mb-6 text-center">Online Interview Details Form</h2>
                                                                    <form onSubmit={handleOnlineInterview} className="md:grid grid-cols-1 md:grid-cols-2 gap-5 bg-white rounded w-full">

                                                                        {/* Date */}
                                                                        <div className="mb-4">
                                                                            <label className="block text-gray-700 font-bold mb-2">Interview Date</label>
                                                                            <input
                                                                                type="date"
                                                                                name="interviewDate"
                                                                                value={formData.interviewDate}
                                                                                onChange={handleChange}
                                                                                className="block w-full px-4 py-2 mt-2 bg-white border border-gray-200 rounded-md  focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40  focus:outline-none focus:ring"
                                                                                required
                                                                            />
                                                                        </div>

                                                                        {/* Time */}
                                                                        <div className="mb-4">
                                                                            <label className="block text-gray-700 font-bold mb-2">Interview Time</label>
                                                                            <input
                                                                                type="time"
                                                                                name="interviewTime"
                                                                                value={formData.interviewTime}
                                                                                onChange={handleChange}
                                                                                className="block w-full px-4 py-2 mt-2 bg-white border border-gray-200 rounded-md  focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40  focus:outline-none focus:ring"
                                                                                required
                                                                            />
                                                                        </div>


                                                                        {/* Contact Information */}
                                                                        <div className="mb-4">
                                                                            <label className="block text-gray-700 font-bold mb-2">Contact Person</label>
                                                                            <input
                                                                                type="text"
                                                                                name="contactPerson"
                                                                                value={formData.contactPerson}
                                                                                onChange={handleChange}
                                                                                placeholder="Recruiter's Name"
                                                                                className="block w-full px-4 py-2 mt-2 bg-white border border-gray-200 rounded-md  focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40  focus:outline-none focus:ring"
                                                                                required
                                                                            />
                                                                        </div>

                                                                        <div className="mb-4">
                                                                            <label className="block text-gray-700 font-bold mb-2">Contact Email</label>
                                                                            <input
                                                                                type="email"
                                                                                name="contactEmail"
                                                                                value={formData.contactEmail}
                                                                                onChange={handleChange}
                                                                                placeholder="recruiter@example.com"
                                                                                className="block w-full px-4 py-2 mt-2 bg-white border border-gray-200 rounded-md  focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40  focus:outline-none focus:ring"
                                                                                required
                                                                            />
                                                                        </div>

                                                                        <div className="mb-4">
                                                                            <label className="block text-gray-700 font-bold mb-2">Contact Phone</label>
                                                                            <input
                                                                                type="tel"
                                                                                name="contactPhone"
                                                                                value={formData.contactPhone}
                                                                                onChange={handleChange}
                                                                                placeholder="Phone Number"
                                                                                className="block w-full px-4 py-2 mt-2 bg-white border border-gray-200 rounded-md  focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40  focus:outline-none focus:ring"
                                                                                required
                                                                            />
                                                                        </div>

                                                                        {/* Interview Format */}
                                                                        <div className="mb-4">
                                                                            <label className="block text-gray-700 font-bold mb-2">Interview Format</label>
                                                                            <input
                                                                                type="text"
                                                                                name="interviewFormat"
                                                                                value={formData.interviewFormat}
                                                                                onChange={handleChange}
                                                                                placeholder="One-on-one, Panel, etc."
                                                                                className="block w-full px-4 py-2 mt-2 bg-white border border-gray-200 rounded-md  focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40  focus:outline-none focus:ring"
                                                                                required
                                                                            />
                                                                        </div>

                                                                        {/* Submit Button */}
                                                                        <div className='flex justify-end md:col-span-2'>
                                                                            <button className='py-2 px-6 text-lg font-medium text-white bg-[#2557a7] rounded-md hover:bg-[#0d2d5e]'>
                                                                                {isLoading ? <TbFidgetSpinner className='animate-spin m-auto' /> : 'Submit'}
                                                                            </button>
                                                                        </div>
                                                                    </form>
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