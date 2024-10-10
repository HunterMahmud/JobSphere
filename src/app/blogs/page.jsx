"use client";
import React, { useState, useEffect } from "react";
import BlogsCard from "@/components/Blogs/BlogsCard";

const BlogPage = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1); // Track current page
  const [totalPages, setTotalPages] = useState(1); // Track total pages

  // Fetch blogs with pagination
  const fetchBlogs = async (page) => {
    setLoading(true);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SITE_ADDRESS}/blogs/api?page=${page}&limit=6`
      );
      const contentType = response.headers.get("content-type");

      // Check if response is JSON
      if (contentType && contentType.includes("application/json")) {
        const data = await response.json();
        if (response.ok) {
          setBlogs(data.blogs);
          setTotalPages(data.totalPages);
          setCurrentPage(data.currentPage);
        } else {
          throw new Error(data.message || "Failed to fetch blogs");
        }
      } else {
        throw new Error("Expected JSON, received non-JSON response");
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Fetch blogs on page load and when currentPage changes
  useEffect(() => {
    fetchBlogs(currentPage);
  }, [currentPage]);

  // Handle page navigation
  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="container mx-auto my-12">
      <h1 className="text-3xl font-bold text-center mb-8">Blogs</h1>

      {/* Blog Cards */}
      <div className="grid my-10 grid-cols-1 md:grid-cols-2 gap-5 px-2">
        {blogs.length > 0 ? (
          blogs.map((blog, i) => <BlogsCard key={i} Blog={blog} />)
        ) : (
          <p>No blogs available</p>
        )}
      </div>

      {/* Pagination */}
      <div className="mt-16 flex justify-center gap-6">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="btn px-4 py-2 border-2 text-lg font-semibold hover:border hover:border-sky-700 bg-sky-300 hover:bg-sky-400 rounded-lg"
        >
          Previous
        </button>
        <div className="space-x-2">
          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              onClick={() => handlePageChange(i + 1)}
              className={`btn px-4 py-2 border-2 text-lg font-semibold ${
                currentPage === i + 1
                  ? "bg-sky-400 border-sky-700"
                  : "bg-sky-300 hover:bg-sky-400"
              } rounded-lg`}
            >
              {i + 1}
            </button>
          ))}
        </div>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="btn px-4 py-2 border-2 text-lg font-semibold hover:border hover:border-sky-700 bg-sky-300 hover:bg-sky-400 rounded-lg"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default BlogPage;
