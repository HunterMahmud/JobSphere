"use client";
import React, { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import { GrNext, GrPrevious } from "react-icons/gr";
import BlogsCard from "@/components/Blogs/BlogsCard";
import axios from "axios";
import Loader from './../loading';
import Head from 'next/head';

const BlogPage = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1); // Track current page
  const [totalPages, setTotalPages] = useState(1); // Track total pages

  // Fetch blogs with pagination
  useEffect(() => {
    const fetchBlogs = async (page = 1) => {
      setLoading(true);
      try {
        const { data } = await axios.get(
          `${process.env.NEXT_PUBLIC_SITE_ADDRESS}/blogs/api/?search=${search}&page=${page}&limit=6`
        );
          
        setBlogs(data.blogs);
        setTotalPages(data.totalPages); // Set total pages from response
        setLoading(false);
      } catch (error) {
        setError("Error fetching data.");
        setLoading(false);
      }
    };
    fetchBlogs(currentPage); // Fetch Blogs when page or search changes
  }, [search, currentPage]);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleSearch = (e) => {
    setCurrentPage(1);
    setSearch(e.target.value);
  };

  if (error) {
    return <p>Error: {error?.message}</p>;
  }

  return (
    <div className="custom-container mx-auto my-12">
      <Head>
        <title>Blogs - Job Sphere</title>
        <meta name="description" content="Explore insightful blogs on job-seeking tips, industry trends, and skills development on Job Sphere." />
        <meta name="keywords" content="Job Sphere, blogs, job seeking, skills development, industry trends, career advice, job market" />
        <meta property="og:title" content="Blogs - Job Sphere" />
        <meta property="og:description" content="Discover valuable insights and tips on job seeking and career development." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={process.env.NEXT_PUBLIC_SITE_ADDRESS + "/blogs"} />
        <meta property="og:image" content="URL_TO_YOUR_DEFAULT_BLOG_IMAGE" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Blogs - Job Sphere" />
        <meta name="twitter:description" content="Explore insightful blogs on job-seeking tips, industry trends, and skills development." />
        <meta name="twitter:image" content="URL_TO_YOUR_DEFAULT_BLOG_IMAGE" />
      </Head>

      <h1 className="text-3xl font-bold text-center mb-8">Blogs</h1>

      {/* Search Function */}
      <div className="flex items-center bg-white rounded-l-lg border-2 border-accent w-[300px] mx-auto my-8 p-2">
        <FaSearch className="ml-3 text-gray-400" />
        <input
          type="text"
          className="w-[300px] p-2 border-none focus:outline-none"
          placeholder="Search with blog title"
          onChange={(e) => handleSearch(e)}
        />
      </div>
      {/* Blog Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {loading ? (
          <div className="md:grid-cols-2 lg:col-span-3">
            <Loader />
          </div>
        ) : Array.isArray(blogs) && blogs.length > 0 ? (
          blogs.map((blog, i) => <BlogsCard key={i} blog={blog} />)
        ) : (
          <p className="text-center md:grid-cols-2 lg:col-span-3">No blogs found</p>
        )}
      </div>

      {/* Pagination */}
      {Array.isArray(blogs) && blogs.length > 0 && (
        <div className="mt-16 flex justify-center gap-1 md:gap-3 lg:gap-6">
          <button
            onClick={handlePreviousPage}
            disabled={currentPage === 1}
            className="btn px-2 py-2 border-2 text-xs lg:text-lg font-semibold bg-primary hover:bg-hover rounded-lg text-white"
          >
            <GrPrevious />
          </button>
          <div className="space-x-2">
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index + 1}
                onClick={() => setCurrentPage(index + 1)}
                className={`btn px-3 py-2 border-2 text-xs lg:text-lg font-semibold hover:bg-hover rounded-lg ${
                  currentPage === index + 1 ? "text-primary bg-white border hover:text-white border-primary" : "bg-primary text-white"
                }`}
              >
                {index + 1}
              </button>
            ))}
          </div>
          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            className="btn px-2 py-2 border-2 text-xs lg:text-lg font-semibold bg-primary hover:bg-hover rounded-lg text-white"
          >
            <GrNext />
          </button>
        </div>
      )}
    </div>
  );
};

export default BlogPage;
