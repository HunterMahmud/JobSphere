"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import useRole from "@/components/Hooks/useRole";
import { toast } from "react-hot-toast";

const WriteABlog = () => {
  const { loggedInUser, isLoading } = useRole();
  const [image, setImage] = useState(null); // State to store selected image
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm();

  const onSubmit = async (data) => {
    // Create blog data with user information
    const blogData = {
      ...data,
      author: loggedInUser.fullName, // Automatically set the logged-in user's name
      authorEmail:loggedInUser.email,
      userId: loggedInUser._id, // Automatically set the logged-in user's ID
      publishedDate: new Date().toISOString(), // Add the current date
      upvotes: 0,
      downvotes: 0,
      votedUsers: [], // Initially no one has voted
    };

    // Form data for image upload
    const formData = new FormData();
    formData.append("image", image[0]); // Add the image to FormData

    try {
      // Upload image to imgBB
      const { data: imageData } = await axios.post(
        `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMGBB_API_KEY}`,
        formData
      );
    //   console.log({ ...blogData, blogImage: imageData?.data?.display_url })

      axios
        .post(
          `${process.env.NEXT_PUBLIC_SITE_ADDRESS}/dashboard/writeABlog/api`,
          { ...blogData, blogImage: imageData?.data?.display_url }
        )
        .then((response) => {
          toast.success("Blog post submitted successfully");
        reset();
        });
    } catch (error) {
      toast.error("Error uploading image.");
    }
  };

  if (isLoading) {
    return <p>Loading...</p>; // Display loading while fetching user data
  }

  return (
    <div className="p-6 bg-white shadow-md rounded-md">
      <h1 className="text-3xl font-bold mb-6 text-center">Write A New Blog</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Blog Title */}
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="title">
            Blog Title
          </label>
          <input
            type="text"
            id="title"
            {...register("title", { required: "Title is required" })}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors?.title && (
            <p className="text-red-500 text-sm mt-1">
              {errors?.title?.message}
            </p>
          )}
        </div>

        {/* Blog Content */}
        <div className="mb-4">
          <label
            className="block text-gray-700 font-bold mb-2"
            htmlFor="content"
          >
            Blog Content
          </label>
          <textarea
            id="content"
            rows="6"
            {...register("content", { required: "Content is required" })}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors?.content && (
            <p className="text-red-500 text-sm mt-1">
              {errors?.content?.message}
            </p>
          )}
        </div>

        {/* Blog Image */}
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="image">
            Blog Image
          </label>
          <input
            type="file"
            id="image"
            accept="image/*"
            {...register("image", {
              required: "Image is required",
              validate: {
                checkFileType: (value) =>
                  (value && value[0]?.type.startsWith("image/")) ||
                  "Only images are allowed",
              },
            })}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(e) => setImage(e.target.files)}
          />
          {errors?.image && (
            <p className="text-red-500 text-sm mt-1">
              {errors?.image?.message}
            </p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
        >
          Submit Blog
        </button>
      </form>
    </div>
  );
};

export default WriteABlog;
