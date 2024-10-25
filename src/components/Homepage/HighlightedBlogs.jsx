"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import BlogsCard from "../Blogs/BlogsCard";
import Loader from "@/app/loading";
import Link from 'next/link';

const HighlightedBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state

  // Fetch blogs
  useEffect(() => {
    const fetchBlogs = async () => {
      setLoading(true); // Start loader
      try {
        const { data } = await axios.get(`${process.env.NEXT_PUBLIC_SITE_ADDRESS}/blogs/highlightedBlogs/api`);
        setBlogs(data.blogs); // Assuming API returns blogs in `data.blogs`
        setLoading(false); // Stop loader
      } catch (error) {
        setLoading(false); // Stop loader even if there's an error
        console.error("Error fetching data: ", error);
      }
    };
    fetchBlogs();
  }, []);

  return (
    <div className="custom-container mx-auto my-12">
      <h1 className="text-3xl font-extrabold text-center mb-8">Highlighted Blogs</h1>

      {/* Show loader if data is still loading */}
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {Array.isArray(blogs) && blogs.length > 0 ? (
              blogs.map((blog, i) => (
                <div key={i} className="flex justify-center">
                  <BlogsCard blog={blog} />
                </div>
              ))
            ) : (
              <p className="text-center col-span-full">No blogs found</p>
            )}
          </div>
          {/* Add "Read More" button at the bottom */}
          <div className="flex justify-center mt-8">
            <Link href={"/blogs"}>
          <button className='bg-primary  hover:bg-hover  py-3 px-6 shadow-2xl text-white font-bold  rounded-md text-sm transition-colors duration-300 ease-in-out'> Read More</button>
          </Link>
          </div>
          
        </>
      )}
    </div>
  );
};

export default HighlightedBlogs;

