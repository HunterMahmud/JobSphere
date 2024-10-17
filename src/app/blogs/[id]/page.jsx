"use client";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import axios from "axios";
import Image from "next/image";
import  Loader  from "@/app/loading";

const BlogDetails = ({ params }) => {
  const  session = useSession(); // Access session data
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [hasVoted, setHasVoted] = useState(null); // Track user's vote status

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
        setLoading(true)
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
    if (session?.status === 'authenticated') {
        
      fetchBlogDetails();
    }
  }, [params.id, session?.status]);

  if (loading) return <Loader />;
  if (error) return <div>{error}</div>;
  if (!blog) return <div>No blog found.</div>;

  // Handle Upvote
  const handleUpvote = async () => {
    if (hasVoted === "upvote") return; // Prevent multiple upvotes
    
    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_SITE_ADDRESS}/api/blog/${blog._id}/vote`, {
        voteType: "upvote",
        email: session?.data?.user?.email,
      });
      if (response.status === 200) {
        setBlog((prev) => ({
          ...prev,
          upvotes: prev.upvotes + 1,
          downvotes:
            hasVoted === "downvote" ? prev.downvotes - 1 : prev.downvotes,
        }));
        setHasVoted("upvote");
      }
    } catch (error) {
      console.error("Error while upvoting:", error);
    }
  };

  // Handle Downvote
  const handleDownvote = async () => {
    if (hasVoted === "downvote") return; // Prevent multiple downvotes

    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_SITE_ADDRESS}/api/blog/${blog._id}/vote`, {
        voteType: "downvote",
        email: session?.data?.user?.email,
      });
      if (response.status === 200) {
        setBlog((prev) => ({
          ...prev,
          downvotes: prev.downvotes + 1,
          upvotes: hasVoted === "upvote" ? prev.upvotes - 1 : prev.upvotes,
        }));
        setHasVoted("downvote");
      }
    } catch (error) {
      console.error("Error while downvoting:", error);
    }
  };

  return (
    <div className="container mx-auto my-10 p-6">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-4xl font-bold mb-4">{blog.title}</h1>
        <div className="flex justify-between items-center mb-4">
          <p className="text-gray-600">By {blog?.author}</p>
          <p className="text-gray-600">{new Date(blog?.publishedDate).toLocaleDateString()}</p>
        </div>
        {blog.blogImage && (
          <Image
            src={blog.blogImage}
            alt={blog.title}
            width={1000}
            height={200}
            className="rounded-md w-full h-full"
          />
        )}
        <p className="mt-4 text-lg">{blog.content}</p>

        {/* Upvote and Downvote Section */}
        <div className="flex items-center mt-6 space-x-4">
          <button
            onClick={handleUpvote}
            className={`px-4 py-2 rounded-lg ${
              hasVoted === "upvote" ? "bg-green-500 text-white" : "bg-gray-200"
            }`}
          >
            Upvote {blog.upvotes}
          </button>
          <button
            onClick={handleDownvote}
            className={`px-4 py-2 rounded-lg ${
              hasVoted === "downvote"
                ? "bg-red-500 text-white"
                : "bg-gray-200"
            }`}
          >
            Downvote {blog.downvotes}
          </button>
        </div>
      </div>
    </div>
  );
};

export default BlogDetails;
