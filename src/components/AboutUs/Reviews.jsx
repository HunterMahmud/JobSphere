"use client"
import { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import Image from "next/image";
import { toast } from 'react-hot-toast';
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";

const Reviews = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm();
  const [loading, setLoading] = useState(false);
  const watchRating = watch("rating");
  const seasons =useSession()
  const router = useRouter();
   const User =seasons?.data?.user
  
console.log(seasons);

  // Handle form submission and save to database
  const onSubmit = async (data) => {
    setLoading(true);
    if (!User) {
      Swal.fire({
        position: "top",
        icon: "info",
        title: "Please,Login first",
        showConfirmButton: false,
        timer: 2000
      });
     router.push('/login');
     return
    }

    const reviewData = {
      ...data,
      rating: parseInt(data?.rating),
      photoURL:User?.image,
      reviewDateTime: new Date(),
      
    };
   
    try {
      const response = await axios.post("/api/reviews", reviewData);
      if (response?.status === 200) {
        toast.success("Review submitted successfully!");
        reset(); // Reset the form after successful submission
      } else {
        toast.error("Error submitting the review.");
      }
    } catch (error) {
      // console.error("Failed to submit review:", error);
      toast.error("Error submitting the review.");
    }

    setLoading(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold text-center mb-8">
        Submit Your Review
      </h2>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Left Side: Form */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-2xl font-semibold mb-6">Submit Your Review</h3>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Name Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Your Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                {...register("name", { required: "Name is required" })}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors?.name && (
                <p className="text-red-500 text-sm">{errors.name?.message}</p>
              )}
            </div>
            {/* Email Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Your Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                {...register("email", { required: "Email is required" })}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors?.email && (
                <p className="text-red-500 text-sm">{errors.email?.message}</p>
              )}
            </div>

            {/* Review Textarea */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Your Review <span className="text-red-500">*</span>
              </label>
              <textarea
                {...register("review", {
                  required: "Review is required",
                  maxLength: {
                    value: 255,
                    message: "Review cannot exceed 255 characters",
                  },
                })}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows="4"
                maxLength="255"
              ></textarea>
              {errors?.review && (
                <p className="text-red-500 text-sm">{errors.review?.message}</p>
              )}
            </div>

            {/* Star Rating */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Star Rating <span className="text-red-500">*</span>
              </label>
              <div className="flex space-x-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <label key={star}>
                    <input
                      type="radio"
                      value={star}
                      {...register("rating", {
                        required: "Rating is required",
                      })}
                      className="hidden"
                    />
                    <svg
                      className={`w-8 h-8 cursor-pointer ${
                        star <= (watchRating || 0)
                          ? "text-yellow-500"
                          : "text-gray-400"
                      }`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.588 4.87a1 1 0 00.95.69h5.104c.969 0 1.371 1.24.588 1.81l-4.148 3.01a1 1 0 00-.364 1.118l1.588 4.87c.3.921-.755 1.688-1.539 1.118L10 15.637l-4.148 3.01c-.784.57-1.838-.197-1.539-1.118l1.588-4.87a1 1 0 00-.364-1.118L1.389 9.497c-.783-.57-.381-1.81.588-1.81h5.104a1 1 0 00.95-.69l1.588-4.87z" />
                    </svg>
                  </label>
                ))}
              </div>
              {errors?.rating && (
                <p className="text-red-500 text-sm">{errors.rating?.message}</p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-primary hover:bg-hover text-white py-2 rounded-md transition-colors"
              disabled={loading}
            >
              {loading ? "Submitting..." : "Submit Review"}
            </button>
          </form>
        </div>

        {/* Right Side: Image */}
        <div className="flex justify-center items-center">
          <Image
            src="https://i.ibb.co.com/1JxCwVX/2704881.jpg" // Replace with the actual image source later
            alt="Review Illustration"
            width={400}
            height={400}
            className="rounded-lg w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default Reviews;
