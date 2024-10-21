"use client";

import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import DatePicker from "react-datepicker";
import { addDays } from "date-fns";
import axios from "axios";
import toast from "react-hot-toast";
import "react-datepicker/dist/react-datepicker.css";
import CreatableSelect from "react-select/creatable";
import { useRouter } from 'next/navigation';


const UpdateJobs = ({ params }) => {
  const [job, setJob] = useState(null); // Initialize job state to null
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const loadJob = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_SITE_ADDRESS}/dashboard/myPostedJobs/api/postedJobs/${params?.id}`
        );
        setJob(response.data.data); // Update state with job details
      } catch (error) {
        toast.error("Error fetching job details.");
      }
    };

    loadJob(); // Fetch job details when component loads
  }, [params?.id]);
  // React Hook Form setup
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: job, // Set initial form values
  });

  // Submit updated job data using Axios
  const onSubmit = async (info) => {
    const { _id, ...updateInfo } = info;
    setLoading(true);
    try {
      const { data } = await axios.put(
        `${process.env.NEXT_PUBLIC_SITE_ADDRESS}/dashboard/myPostedJobs/api/postedJobs/${params.id}`,
        updateInfo,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (data?.response?.modifiedCount === 1) {
        toast.success("Updated Successfully");
        router.push('/dashboard/myPostedJobs');
      } else {
        toast.error("Make change to update");
      }
    } catch (error) {
      // console.log("error: ", error);
      toast.error("Failed to update job");
    }
    setLoading(false);
  };

  // Pre-fill form fields after job data is fetched
  useEffect(() => {
    if (job) {
      reset(job); // Update form with job details once they are loaded
    }
  }, [job, reset]);

  if (!job) {
    return <div>Loading job details...</div>; // Show loading message until job data is fetched
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold mb-8 text-center">Update Job</h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium">Job Title</label>
              <input
                {...register("jobTitle", { required: "Job Title is required" })}
                type="text"
                className="w-full mt-1 p-2 border rounded-lg"
                placeholder="e.g. Backend Developer"
              />
              {errors?.jobTitle && (
                <p className="text-red-500 text-sm">
                  {errors?.jobTitle?.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium">Vacancy</label>
              <input
                {...register("vacancy", {
                  required: "Vacancy is required",
                  valueAsNumber: true,
                })}
                type="number"
                className="w-full mt-1 p-2 border rounded-lg"
                placeholder="e.g. 3"
              />
              {errors?.vacancy && (
                <p className="text-red-500 text-sm">
                  {errors?.vacancy?.message}
                </p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium">Location Type</label>
              <select
                {...register("locationType", {
                  required: "Location Type is required",
                })}
                className="w-full mt-1 p-2 border rounded-lg"
              >
                <option value="Remote">Remote</option>
                <option value="On-Site">On-Site</option>
                <option value="Hybrid">Hybrid</option>
              </select>
              {errors?.locationType && (
                <p className="text-red-500 text-sm">
                  {errors?.locationType?.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium">Job Type</label>
              <select
                {...register("jobType", { required: "Job Type is required" })}
                className="w-full mt-1 p-2 border rounded-lg"
              >
                <option value="Full-Time">Full-Time</option>
                <option value="Part-Time">Part-Time</option>
                <option value="Contract-Based">Contract-Based</option>
              </select>
              {errors.jobType && (
                <p className="text-red-500 text-sm">{errors.jobType.message}</p>
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium">Salary Scale</label>
            <input
              {...register("salaryScale", {
                required: "Salary Scale is required",
              })}
              type="text"
              className="w-full mt-1 p-2 border rounded-lg"
              placeholder="e.g. $80,000 - $100,000"
            />
            {errors?.salaryScale && (
              <p className="text-red-500 text-sm">
                {errors?.salaryScale?.message}
              </p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium">Education</label>
              <input
                {...register("education", {
                  required: "Education is required",
                })}
                type="text"
                className="w-full mt-1 p-2 border rounded-lg"
                placeholder="e.g. Bachelor's in Computer Science"
              />
              {errors?.education && (
                <p className="text-red-500 text-sm">
                  {errors?.education?.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium">
                Experience (Years)
              </label>
              <input
                {...register("experience", {
                  required: "Experience is required",
                  valueAsNumber: true,
                })}
                type="number"
                className="w-full mt-1 p-2 border rounded-lg"
                placeholder="e.g. 4"
              />
              {errors?.experience && (
                <p className="text-red-500 text-sm">
                  {errors?.experience?.message}
                </p>
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium">
              Additional Requirements
            </label>
            <textarea
              {...register("additionalRequirements", {
                required: "Additional Requirements are required",
              })}
              className="w-full mt-1 p-2 border rounded-lg"
              placeholder="e.g. Proficient in Node.js, SQL, and AWS"
            ></textarea>
            {errors?.additionalRequirements && (
              <p className="text-red-500 text-sm">
                {errors?.additionalRequirements?.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium">
              Responsibilities
            </label>
            <textarea
              {...register("responsibility", {
                required: "Responsibilities are required",
              })}
              className="w-full mt-1 p-2 border rounded-lg"
              placeholder="e.g. Details about job responsibilities"
            ></textarea>
            {errors?.responsibility && (
              <p className="text-red-500 text-sm">
                {errors?.responsibility?.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium">Deadline</label>
            <Controller
              control={control}
              name="deadline"
              rules={{ required: "Deadline is required" }}
              render={({ field }) => (
                <DatePicker
                  selected={field?.value}
                  onChange={(date) => field.onChange(date)}
                  minDate={addDays(new Date(), 1)}
                  placeholderText="Select a deadline date"
                  className="w-full mt-1 p-2 border rounded-lg"
                />
              )}
            />
            {errors?.deadline && (
              <p className="text-red-500 text-sm">
                {errors?.deadline?.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium">Skills</label>
            <Controller
              control={control}
              name="skills"
              render={({ field }) => (
                <CreatableSelect
                  isMulti
                  onChange={(selected) =>
                    field.onChange(selected.map((skill) => skill?.value))
                  }
                  className="w-full mt-1 p-2"
                  placeholder="Type and press Enter to add skills"
                  // Set default values from job.skills array
                  defaultValue={job?.skills?.map((skill) => ({
                    label: skill,
                    value: skill,
                  }))}
                />
              )}
            />
            {errors.skills && (
              <p className="text-red-500 text-sm">{errors?.skills?.message}</p>
            )}
          </div>

          <div className="text-center">
            <button
              type="submit"
              disabled={loading}
              className="bg-primary hover:bg-hover text-white py-2 px-4 rounded-lg"
            >
              Update Job
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateJobs;
