"use client";
import { useState, useEffect, useRef } from "react";
import { useSession } from "next-auth/react";
import {
  BiUpvote,
  BiSolidUpvote,
  BiDownvote,
  BiSolidDownvote,
} from "react-icons/bi";
import axios from "axios";
import Image from "next/image";
import Loader from "@/app/loading";
import { toast } from 'react-hot-toast';
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
import useRole from "@/components/Hooks/useRole";
const BlogDetails = ({ params }) => {
  const session = useSession(); // Access session data
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [hasVoted, setHasVoted] = useState(null); // Track user's vote status
  const [showModal, setShowModal] = useState(false); // Track modal visibility
  const modalRef = useRef(); // Ref for modal
  const { loggedInUser } = useRole();
  // Fetch blog details
  const getBlogDetails = async (id) => {
    try {
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_SITE_ADDRESS}/blogs/api/${id}`
      );
      return data.blog;
    } catch (error) {
      setError("Could not fetch blog details.");
      return null;
    }
  };

  useEffect(() => {
    const fetchBlogDetails = async () => {
      setLoading(true);
      const details = await getBlogDetails(params.id);
      if (details) {
        setBlog(details);
        const votedUser = details?.votedUsers?.find(
          (v) => v.email === session?.data?.user?.email
        );
        if (votedUser) setHasVoted(votedUser.voteType); // Set user's vote type
      }
      setLoading(false);
    };

    fetchBlogDetails();
  }, [params.id, session?.status]);

  // Handle Upvote
  const handleUpvote = async () => {
    if (loggedInUser?.status === "blocked") {
      toast.error("You are blocked by the authority. Please contact support for assistance.");
      return;
    }
    if (session?.status !== "authenticated") {
      return toast.error("Login to vote");
    }
    if (hasVoted === "upvote") return toast.error("Already Upvoted"); // Prevent multiple upvotes

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_SITE_ADDRESS}/api/blog/${blog._id}/vote`,
        {
          voteType: "upvote",
          email: session?.data?.user?.email,
        }
      );
      if (response.status === 200) {
        setBlog((prev) => ({
          ...prev,
          upvotes: prev.upvotes + 1,
          downvotes:
            hasVoted === "downvote" ? prev.downvotes - 1 : prev.downvotes,
        }));
        setHasVoted("upvote");
        toast.success("Upvoted successfully");
      }
    } catch (error) {
      console.error("Error while upvoting:", error);
    }
  };

  // Handle Downvote
  const handleDownvote = async () => {
    if (loggedInUser?.status === "blocked") {
      toast.error("You are blocked by the authority. Please contact support for assistance.");
      return;
    }
    if (session?.status !== "authenticated") {
      return toast.error("Login to vote");
    }
    if (hasVoted === "downvote") return toast.error("Already Downvoted"); // Prevent multiple downvotes

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_SITE_ADDRESS}/api/blog/${blog._id}/vote`,
        {
          voteType: "downvote",
          email: session?.data?.user?.email,
        }
      );
      if (response.status === 200) {
        setBlog((prev) => ({
          ...prev,
          downvotes: prev.downvotes + 1,
          upvotes: hasVoted === "upvote" ? prev.upvotes - 1 : prev.upvotes,
        }));
        setHasVoted("downvote");
        toast.success("Downvoted successfully");
      }
    } catch (error) {
      console.error("Error while downvoting:", error);
    }
  };

  // Handle Copy Link
  const handleCopyLink = () => {
    const blogUrl = `${process.env.NEXT_PUBLIC_SITE_ADDRESS}/blogs/${blog._id}`;
    navigator.clipboard.writeText(blogUrl).then(() => {
      toast.success("Link copied to clipboard!");
      setShowModal(!showModal)
    }).catch((error) => {
      toast.error("Failed to copy link.");
      console.error("Copy failed:", error);
    });
  };

  // Toggle Modal
  const toggleModal = () => {
    setShowModal(!showModal);
  };

  // Handle outside click close
  const handleOutsideClick = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      setShowModal(false);
    }
  };

  // Add event listener to detect clicks outside modal
  useEffect(() => {
    if (showModal) {
      document.addEventListener("mousedown", handleOutsideClick);
    }

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [showModal]);

  if (loading) return <Loader />;
  if (error) return <div>{error}</div>;
  if (!blog) return <div>No blog found.</div>;

  return (
    <div className="custom-container mx-auto my-10 p-2 md:p-4">
      <div className="bg-white rounded-lg shadow-lg p-2 md:p-4">
        {blog.blogImage && (
          <div>
            <Image
              src={blog?.blogImage}
              alt={blog?.title}
              width={1000}
              height={200}
              className="rounded-md w-full h-[300px] object-cover"
            />
          </div>
        )}

        <h1 className="text-2xl md:text-3xl lg:text-4xl mt-4 font-bold mb-4">{blog.title}</h1>
        <div className="flex justify-between items-center mb-4">
          <div>
            <p className="text-gray-600 font-bold">{blog?.author}</p>
            <p className="text-gray-600">
              {new Date(blog?.publishedDate).toLocaleDateString()}
            </p>
          </div>
        </div>

        <p className="mt-4 text-lg">{blog?.content}</p>

        {/* Upvote and Downvote Section */}
        <div className="flex justify-between items-start">
          <div className="flex items-center mt-6 space-x-4">
            <button
              onClick={handleUpvote}
              className={`flex flex-row items-center justify-between px-4 py-2 rounded-lg ${hasVoted === "upvote" ? "bg-green-400 text-white" : "bg-gray-200"
                }`}
            >
              {hasVoted === "upvote" ? (
                <BiSolidUpvote className="mr-2" />
              ) : (
                <BiUpvote className="mr-2" />
              )}{" "}
              {blog?.upvotes}
            </button>
            <button
              onClick={handleDownvote}
              className={`flex flex-row items-center justify-between px-4 py-2 rounded-lg ${hasVoted === "downvote" ? "bg-red-400 text-white" : "bg-gray-200"
                }`}
            >
              {hasVoted === "downvote" ? (
                <BiSolidDownvote className="mr-2" />
              ) : (
                <BiDownvote className="mr-2" />
              )}{" "}
              {blog?.downvotes}
            </button>
          </div>
          {/* Share Icon */}
          <button onClick={toggleModal} className=" mt-6 flex items-center text-primary justify-center gap-3  hover:text-white bg-accent hover:bg-primary opacity-95 duration-300 px-4 rounded-lg py-2">
            
            <FaShareFromSquare size={24}/>
          </button>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
          <div ref={modalRef} className="bg-white rounded-lg p-6 relative">
            <button onClick={toggleModal} className="absolute top-2 right-2 text-gray-600 hover:text-gray-800">
              <AiOutlineClose size={24} />
            </button>

            <h2 className="text-xl font-bold mb-4">Share this blog</h2>

            <div className="flex space-x-4">
              <div className="hover:bg-accent p-2 duration-200 rounded-lg">
                <FacebookShareButton
                  onClick={() => setShowModal(!showModal)}
                  url={`${process.env.NEXT_PUBLIC_SITE_ADDRESS}/blogs/${blog._id}`}
                  quote={blog?.title}
                  className="hover:opacity-80 p-3 hover:bg-accent flex flex-col items-center justify-center "
                >
                  <FacebookIcon size={32} round />
                  <span className="text-xs text-center">Facebook</span>
                </FacebookShareButton>

              </div>
              <div className="hover:bg-accent p-2 duration-200 rounded-lg">
                <LinkedinShareButton
                  onClick={() => setShowModal(!showModal)}
                  url={`${process.env.NEXT_PUBLIC_SITE_ADDRESS}/blogs/${blog._id}`}
                  title={blog?.title}
                  className="hover:opacity-80 flex flex-col items-center justify-center"
                >
                  <LinkedinIcon size={32} round />
                  <span className="text-xs text-center">LinkedIn</span>
                </LinkedinShareButton>
              </div>

              <div className="hover:bg-accent px-3 py-2 duration-200 rounded-lg">
                <TwitterShareButton
                  onClick={() => setShowModal(!showModal)}
                  url={`${process.env.NEXT_PUBLIC_SITE_ADDRESS}/blogs/${blog._id}`}
                  title={blog?.title}
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
  );
};

export default BlogDetails;
