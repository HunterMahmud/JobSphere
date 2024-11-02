"use client";
import React, { Fragment, useEffect, useRef, useState } from "react";
import axios from "axios";
import {
  FaBookmark,
  FaBriefcase,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaClock,
  FaBuilding,
  FaEnvelope,
  FaPhone,
  FaGlobe,
} from "react-icons/fa";
import {
  FacebookShareButton,
  LinkedinShareButton,
  TwitterShareButton,
  FacebookIcon,
  LinkedinIcon,
  TwitterIcon,
} from "react-share";
import { AiOutlineClose } from "react-icons/ai"; // Close icon for modal
import { FaLink } from "react-icons/fa";
import { FaShareFromSquare } from "react-icons/fa6";

import { TbFidgetSpinner } from "react-icons/tb"; // Icons from react-icons
import { useSession } from "next-auth/react";
import Loader from "@/app/loading";
import Swal from "sweetalert2";
import Image from "next/image";
import Modal from "@/components/Modal/Modal";
import useSeekerInfo from "@/components/Hooks/useSeekerInfo";
import toast from "react-hot-toast";
import useRole from "@/components/Hooks/useRole";
import Link from "next/link";
import { BiChevronsRight } from "react-icons/bi";

const JobDetails = ({ params }) => {
  const [showSkill, setShowSkill] = useState(false);
  const [apply, setApply] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [job, setJob] = useState(null); // State to store job details
  const [applicantsNumber, setApplicantsNumber] = useState(
    job?.applicantsNumber
  );
  const [loading, setLoading] = useState(true); // State to manage loading state
  const [error, setError] = useState(null); // State to handle errors
  const { data: session } = useSession();
  const { loggedInUser } = useRole();
  const [message, setMessage] = useState();
  const { seekerInfo } = useSeekerInfo();
  const [showModal2, setShowModal2] = useState(false); // Track modal visibility
  const modalRef = useRef(); // Ref for modal
  const today = new Date();
  const deadline = new Date(job?.deadline);
  // const { saveUsers } = job;
  const email = session?.user?.email

  const similarSkillsCount = job?.skills?.filter(skill =>
    seekerInfo?.skills?.technicalSkills?.map(js => js.toLowerCase()).includes(skill.toLowerCase())
  );

  let unmatchedSkills = job?.skills?.filter(skill =>
    !seekerInfo?.skills?.technicalSkills?.map(js => js.toLowerCase()).includes(skill.toLowerCase())
  );

  const getServicesDetails = async (id) => {
    try {
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_SITE_ADDRESS}/jobs/api/${id}`
      );
      return data.job;
    } catch (error) {
      console.error("Error fetching job details:", error);
      setError("Could not fetch job details.");
      return null;
    }
  };

  useEffect(() => {
    const fetchJobDetails = async () => {
      const details = await getServicesDetails(params.id);
      if (details) {
        setApplicantsNumber(details?.applicantsNumber);
        setJob(details);
      }
      setLoading(false); // Stop loading once data is fetched
    };

    fetchJobDetails();
  }, [params.id]); // Dependency on params.id to fetch details when it changes

  // Handle outside click close
  const handleOutsideClick = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      setShowModal2(false);
    }
  };
  // Add event listener to detect clicks outside modal
  useEffect(() => {
    if (showModal2) {
      document.addEventListener("mousedown", handleOutsideClick);
    }

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [showModal2]);

  if (loading) {
    return <Loader />; // Loading state
  }

  if (error) {
    return <div>{error}</div>; // Error state
  }

  // Fallback if no job details are available
  if (!job) {
    return <div>No job details available.</div>;
  }

  const handleApplyNow = () => {
    if (loggedInUser?.status === "blocked") {
      toast.error("You are blocked by the authority. Please contact support for assistance.");
      return;
    }
    else if (loggedInUser?.role === "recruiter") {
      return toast.error("Action not permitted!");
    } else if (loggedInUser?.role === "admin") {
      return toast.error("Action not permitted!");
    } else {
      setShowModal(!showModal);
      setApply(true);
      setShowSkill(false);
    }
  };

  const handleApplyJob = async (e) => {
    e.preventDefault();
    const form = e.target;
    const resume = form.resume.value;
    // check resume isLink
    try {
      new URL(resume);
      console.log("Ok");
    } catch (_) {
      return toast.error("Please Provide Valid Link");
    }

    if (today > deadline) {
      toast.error("job deadline is over");
      return;
    }

    if (Object.keys(seekerInfo).length <= 3) {
      return toast.error("Please update your profile information first..!");
    }

    if (
      !seekerInfo?.contactInformation?.email ||
      !seekerInfo?.contactInformation?.phoneNumber ||
      !seekerInfo?.contactInformation?.socialLinks
    ) {
      return toast.error(
        "Please update your profile Contact Information first..!"
      );
    }

    // Check if required social links are filled
    if (
      !seekerInfo?.contactInformation?.socialLinks?.linkedin ||
      !seekerInfo?.contactInformation?.socialLinks?.github
    ) {
      return toast.error(
        "Please update your profile Contact Information first..!"
      );
    }

    const applyedJob = {
      applicantInfo: {
        contactInformation: seekerInfo?.contactInformation,
        resume,
      },
      jobId: job?._id,
      jobTitle: job?.jobTitle,
      applicationDate: today,
      jobStatus: "Pending",
      jobType: job?.jobType,
      userId: loggedInUser?._id,
      companyName: job?.compnayInforamtion?.companyInfo?.companyName
    };

    try {
      setIsLoading(true);
      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_SITE_ADDRESS}/jobs/applyedJobApi`,
        applyedJob
      );
      console.log(data);
      if (data.acknowledged) {
        await axios.put(
          `${process.env.NEXT_PUBLIC_SITE_ADDRESS}/dashboard/myPostedJobs/api/postedJobs/${job?._id}`,
          { applicantsNumber: job?.applicantsNumber + 1 }
        );
        toast.success("Apply Successfully");
        setApplicantsNumber(applicantsNumber + 1);
        setShowModal(!showModal);
        setIsLoading(false);
      }
      if (data.status === 400) {
        setIsLoading(false);
        setShowModal(!showModal);
        toast.error("You have applied this job!");
      }
    } catch (err) {
      setIsLoading(false);
      console.log(err?.message);
      toast.error(err?.message);
    }
  };

  const handleSaveJob = async () => {
    if (loggedInUser?.role === "recruiter" || "admin") {
      return toast.error("Action not permitted!");
    }

    if (loggedInUser?.status === "blocked") {
      toast.error("You are blocked by the authority. Please contact support for assistance.");
      return;
    }
    const saveInfo = [
      ...job?.saveUsers || [],
      email
    ]
    // const newJob = { user: session?.user, job };
    const newJob = { user: session?.user, job: { ...job, saveUsers: saveInfo } };

    try {
      // Use axios to make the POST request
      const { data } = await axios.post("/api/saveJob", newJob, {
        headers: {
          "Content-Type": "application/json", // Set the content type
        },
      });

      if (data?.result?.acknowledged) {
        await axios.put(
          `${process.env.NEXT_PUBLIC_SITE_ADDRESS}/dashboard/myPostedJobs/api/postedJobs/${job?._id}`,
          { saveUsers: saveInfo }
        );
        Swal.fire({
          position: "top",
          icon: "success",
          title: "Job Added Successfully",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    } catch (error) {
      if (error.response) {
        if (error.response.status === 409) {
          // If job already exists, set a custom message
          Swal.fire({
            position: "top",
            icon: "info",
            title: "Job already Saved!",
            showConfirmButton: false,
            timer: 1500,
          });
        } else {
          Swal.fire({
            position: "top",
            icon: "info",
            title: `Failed to add job: ${error?.response?.data?.message}`,
            showConfirmButton: false,
            timer: 1500,
          });
        }
      } else if (error.request) {
        // The request was made, but no response was received
        setMessage("No response from server. Please try again.");
        console.error("No response received:", error.request);
      } else {
        // Something happened in setting up the request that triggered an error
        setMessage("Error occurred: " + error.message);
        console.error("Error:", error.message);
      }
    }
  };
  // Handle Copy Link
  const handleCopyLink = () => {
    const blogUrl = `${process.env.NEXT_PUBLIC_SITE_ADDRESS}/jobs/${job._id}`;
    navigator.clipboard.writeText(blogUrl).then(() => {
      toast.success("Link copied to clipboard!");
      setShowModal2(!showModal2)
    }).catch((error) => {
      toast.error("Failed to copy link.");
      console.error("Copy failed:", error);
    });
  };

  // Toggle Modal
  const toggleModal = () => {
    setShowModal2(!showModal2);
  };





  return (
    <Fragment>
      <div className="custom-container mx-auto md:px-4 py-8 ">
        {/* Job Details Section */}
        <div className="bg-white shadow-md p-3 md:p-6 rounded-lg mb-8">
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-start space-x-4">
              <Image
                src={
                  job?.compnayInforamtion?.companyInfo?.logo ||
                  "/default-logo.png"
                }
                alt="Company Logo"
                width={64}
                height={64}
                className="rounded-full w-16 h-16"
              />
              <div>
                <h2 className="text-lg md:text-xl font-bold">
                  {job?.jobTitle}
                </h2>
                <p className="text-sm md:text-md text-gray-500">
                  {job?.compnayInforamtion?.companyInfo?.companyName}
                </p>
              </div>
            </div>
            <button
              onClick={handleSaveJob}
              className="flex items-center text-primary border border-primary px-2 py-1 rounded-lg hover:bg-primary hover:text-white transition"
            >
              <FaBookmark className="w-5 h-5" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
            <div className="flex items-center">
              <FaMapMarkerAlt className="w-5 h-5 mr-2 text-gray-500" />
              <span className="text-gray-800 line-clamp-1">{job?.compnayInforamtion?.companyInfo?.country},{job?.compnayInforamtion?.companyInfo?.city}</span>
            </div>
            <div className="flex items-center">
              <FaBriefcase className="w-5 h-5 mr-2 text-gray-500" />
              <span>{job?.jobType || "Not specified"}</span>
            </div>
            <div className="flex items-center">
              <span className="font-bold mr-2">$</span>
              <span>{job?.salaryScale || "Salary not specified"}</span>
            </div>
            <div className="flex items-center">
              <FaCalendarAlt className="w-5 h-5 mr-2 text-gray-500" />
              <span>
                Posted on: {new Date(job?.postedDate).toLocaleDateString()}
              </span>
            </div>
            <div className="flex items-center">
              <FaClock className="w-5 h-5 mr-2 text-gray-500" />
              <span>
                Deadline: {new Date(job?.deadline).toLocaleDateString()}
              </span>
            </div>
          </div>

          <div className="mb-6">
            <h3 className="font-semibold text-lg">Skills</h3>
            <p className="text-gray-700 whitespace-pre-line mt-2">
              <div className="flex flex-col items-start md:flex-row">
                <div className="flex flex-wrap">
                  {job?.skills.map((skill, index) => (
                    <span
                      key={index}
                      className="bg-accent text-primary px-4 py-1 rounded-full text-sm font-medium shadow-sm hover:bg-blue-200 transition-all duration-300 mr-3"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
                {
                  loggedInUser?.status !== "blocked" && seekerInfo?.skills?.technicalSkills && loggedInUser?.role === "seeker" &&
                  <button onClick={() => {
                    setShowModal(!showModal);
                    setShowSkill(true)
                    setApply(false);
                  }} className="hover:underline mt-2 md:mt-0">
                    {similarSkillsCount?.length} skills match on your profile
                  </button>
                }
              </div>
            </p>
          </div>

          <div className="mb-6">
            <h3 className="font-semibold text-lg">Responsibilities</h3>
            <p className="text-gray-700 whitespace-pre-line">
              {job?.responsibility}
            </p>
          </div>

          <div className="mb-6">
            <h3 className="font-semibold text-lg">Requirements</h3>
            <ul className="list-disc list-inside">
              <li>Education: {job?.education}</li>
              <li>Experience: {job?.experience} years</li>
              <li>{job?.additionalRequirements}</li>
            </ul>
          </div>

          <div className="flex justify-between items-center">
            <button
              onClick={handleApplyNow}
              className="bg-primary text-sm md:text-base text-white px-4 md:px-6 py-2 rounded-lg hover:bg-hover transition"
            >
              Apply Now
            </button>
            <p className="text-gray-500">{applicantsNumber || 0} applicants</p>
          </div>
        </div>

        {/* Company Details Section */}
        <div className="bg-white shadow-md p-3 md:p-6 rounded-lg">
          <div className="flex items-start space-x-4 mb-4">
            <FaBuilding className="w-8 h-8 text-gray-500" />
            <div>
              <h3 className="text-xl font-bold">
                About {job?.compnayInforamtion?.companyInfo?.companyName}
              </h3>
              <p className="text-gray-500">
                {job?.compnayInforamtion?.companyInfo?.companyMission}
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <div>
              <p>
                <strong>Company Type:</strong>{" "}
                {job?.compnayInforamtion?.companyInfo?.companyType}
              </p>
              <p>
                <strong>Founded:</strong>{" "}
                {job?.compnayInforamtion?.companyInfo?.foundedYear}
              </p>
              <p>
                <strong>Size:</strong>{" "}
                {job?.compnayInforamtion?.employmentInfo?.companySize} employees
              </p>
              <p>
                <strong>Address:</strong>{" "}
                {job?.compnayInforamtion?.companyInfo?.address},{" "}
              </p>
            </div>
          </div>
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-5">
              <a
                rel="noopener"
                target="_blank"
                href={`mailto:${job?.compnayInforamtion?.contactInformation?.email}`}
              >
                <FaEnvelope className="w-5 h-5 md:w-6 md:h-6 text-primary" />
              </a>

              <a
                rel="noopener"
                target="_blank"
                href={`tel:${job?.compnayInforamtion?.contactInformation?.phone}`}
              >
                <FaPhone className="w-5 h-5 md:w-6 md:h-6 text-primary" />
              </a>

              <Link
                href={job?.compnayInforamtion?.contactInformation?.website}
                className="text-blue-600"
                target="_blank"
                rel="noreferrer"
              >
                <FaGlobe className="w-5 h-5 md:w-6 md:h-6 text-primary" />
              </Link>

            </div>
            {/* Share Icon */}
            <button onClick={toggleModal} className=" flex items-center text-primary justify-center gap-3 hover:text-white bg-accent hover:bg-primary opacity-95 duration-300 px-4 rounded-lg py-2">
              <FaShareFromSquare size={24} />
            </button>
          </div>
        </div>
        {/* Modal */}
        {showModal2 && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
            <div ref={modalRef} className="bg-white rounded-lg p-6 relative">
              <button onClick={toggleModal} className="absolute top-2 right-2 text-gray-600 hover:text-gray-800">
                <AiOutlineClose size={24} />
              </button>

              <h2 className="text-xl font-bold mb-4">Share this Job</h2>

              <div className="flex space-x-4">
                <div className="hover:bg-accent p-2 duration-200 rounded-lg">
                  <FacebookShareButton
                    onClick={() => setShowModal2(!showModal2)}
                    url={`${process.env.NEXT_PUBLIC_SITE_ADDRESS}/jobs/${job._id}`}
                    quote={job?.title}
                    className="hover:opacity-80 p-3 hover:bg-accent flex flex-col items-center justify-center "
                  >
                    <FacebookIcon size={32} round />
                    <span className="text-xs text-center">Facebook</span>
                  </FacebookShareButton>

                </div>
                <div className="hover:bg-accent p-2 duration-200 rounded-lg">
                  <LinkedinShareButton
                    onClick={() => setShowModal2(!showModal2)}
                    url={`${process.env.NEXT_PUBLIC_SITE_ADDRESS}/jobs/${job._id}`}
                    title={job?.title}
                    className="hover:opacity-80 flex flex-col items-center justify-center"
                  >
                    <LinkedinIcon size={32} round />
                    <span className="text-xs text-center">LinkedIn</span>
                  </LinkedinShareButton>
                </div>

                <div className="hover:bg-accent px-3 py-2 duration-200 rounded-lg">
                  <TwitterShareButton
                    onClick={() => setShowModal2(!showModal2)}
                    url={`${process.env.NEXT_PUBLIC_SITE_ADDRESS}/jobs/${job._id}`}
                    title={job?.title}
                    className="hover:opacity-80 hover:bg-accent duration-200 flex flex-col items-center justify-center"
                  >
                    <TwitterIcon size={32} round />
                    <span className="text-xs text-center">Twitter</span>
                  </TwitterShareButton>
                </div>
                {/* Copy Link Button */}
                <button
                  onClick={handleCopyLink}
                  className="flex flex-col items-center space-x-2  hover:bg-accent px-1 py-2 rounded-lg"
                >
                  <FaLink size={32} className="text-primary" />
                  <span className="text-xs">Copy Link</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      {/* Modal */}
      {
        apply && <Modal isVisible={showModal} showModal={showModal} setShowModal={setShowModal}>
          <div>
            <form onSubmit={handleApplyJob}>
              <div className="grid grid-cols-1 gap-4 mt-4 sm:grid-cols-2">
                <div>
                  <label className="" htmlFor="emailAddress">
                    Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    name="name"
                    defaultValue={seekerInfo?.profileOverview?.fullName}
                    disabled
                    className="block w-full px-4 py-2 mt-2 bg-white border border-gray-200 rounded-md  focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40  focus:outline-none focus:ring"
                  />
                </div>

                <div>
                  <label className="" htmlFor="emailAddress">
                    Email Address
                  </label>
                  <input
                    id="emailAddress"
                    type="email"
                    name="email"
                    defaultValue={seekerInfo?.contactInformation?.email}
                    disabled
                    className="block w-full px-4 py-2 mt-2 bg-white border border-gray-200 rounded-md  focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40  focus:outline-none focus:ring"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="" htmlFor="job_title">
                    Resume Link
                  </label>
                  <input
                    placeholder="Submit your resume link"
                    id="jobTitle"
                    name="resume"
                    type="text"
                    required
                    className="block w-full px-4 py-2 mt-2 bg-white border border-gray-200 rounded-md  focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40  focus:outline-none focus:ring"
                  />
                </div>

                <div className="flex justify-end md:col-span-2">
                  <button className="py-2 px-6 text-lg font-medium text-white bg-primary rounded-md hover:bg-hover">
                    {isLoading ? (
                      <TbFidgetSpinner className="animate-spin m-auto" />
                    ) : (
                      "Apply"
                    )}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </Modal>
      }

      {showSkill && <Modal isVisible={showModal} showModal={showModal} setShowModal={setShowModal}>
        <h1 className="text-center mb-3 font-medium mt-3 md:mt-0">Skills associated with the job</h1>
        <div className="flex flex-col justify-around gap-5 ml-3 md:ml-0">
          <div>
            <h1>Matched Skills : </h1>
            <div className="flex flex-col gap-3 mt-3">
              {
                similarSkillsCount?.map((skill, index) => (
                  <p
                    key={index}
                    className="flex gap-1 items-center text-sm"
                  >
                    <BiChevronsRight className="text-xl" />
                    {skill}
                  </p>
                ))
              }
            </div>
          </div>

          <div className="mt-t">
            <h1>Unmatched Skills : </h1>
            <div className="flex flex-col gap-3 mt-3">
              {
                unmatchedSkills?.map((skill, index) => (
                  <p
                    key={index}
                    className="flex gap-1 items-center text-sm"
                  >
                    <BiChevronsRight className="text-xl" />
                    {skill}
                  </p>
                ))
              }
            </div>
          </div>

        </div>
      </Modal>
      }

    </Fragment>
  );
};

export default JobDetails;
