"use client";
import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { addDays } from "date-fns";
import axios from "axios";
import CreatableSelect from "react-select/creatable";
import { toast } from "react-hot-toast";
import { useSession } from "next-auth/react";
import useProfileInfo from "@/components/Hooks/useProfileInfo";


const JobForm = () => {
  const session = useSession();
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm();

  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    setLoading(true);
    const jobData = { ...data, email: session?.user?.email };
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_SITE_ADDRESS}/dashboard/postAJob/api`,
        jobData
      );
      // console.log(response.data);
      toast.success("Job successfully posted!");
      reset(); // Clear form fields after submission
    } catch (error) {
      // console.error(error);
      toast.error("Error posting a job.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-4xl bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold mb-8 text-center">
          Create A Job Post
        </h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Job Title & Vacancy */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium">Job Title</label>
              <input
                {...register("jobTitle", { required: "Job Title is required" })}
                type="text"
                className="w-full mt-1 p-2 border rounded-lg"
                placeholder="e.g. Backend Developer"
              />
              {errors.jobTitle && (
                <p className="text-red-500 text-sm">
                  {errors.jobTitle.message}
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
              {errors.vacancy && (
                <p className="text-red-500 text-sm">{errors.vacancy.message}</p>
              )}
            </div>
          </div>

          {/* Location Type & Job Type */}
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
              {errors.locationType && (
                <p className="text-red-500 text-sm">
                  {errors.locationType.message}
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

          {/* Salary Scale */}
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
            {errors.salaryScale && (
              <p className="text-red-500 text-sm">
                {errors.salaryScale.message}
              </p>
            )}
          </div>

          {/* Education & Experience */}
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
              {errors.education && (
                <p className="text-red-500 text-sm">
                  {errors.education.message}
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
              {errors.experience && (
                <p className="text-red-500 text-sm">
                  {errors.experience.message}
                </p>
              )}
            </div>
          </div>

          {/* Additional Requirements & Responsibilities */}
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
            {errors.additionalRequirements && (
              <p className="text-red-500 text-sm">
                {errors.additionalRequirements.message}
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
            {errors.responsibility && (
              <p className="text-red-500 text-sm">
                {errors.responsibility.message}
              </p>
            )}
          </div>

          {/* Deadline */}
          <div>
            <label className="block text-sm font-medium">Deadline</label>
            <Controller
              control={control}
              name="deadline"
              rules={{ required: "Deadline is required" }}
              render={({ field }) => (
                <DatePicker
                  selected={field.value}
                  onChange={(date) => field.onChange(date)}
                  minDate={addDays(new Date(), 1)}
                  placeholderText="Select a deadline date"
                  className="w-full mt-1 p-2 border rounded-lg"
                />
              )}
            />
            {errors.deadline && (
              <p className="text-red-500 text-sm">{errors.deadline.message}</p>
            )}
          </div>

          {/* Skills with Creatable Select */}
          <div>
            <label className="block text-sm font-medium">Skills</label>
            <Controller
              control={control}
              name="skills"
              render={({ field }) => (
                <CreatableSelect
                  isMulti
                  onChange={(selected) =>
                    field.onChange(selected.map((skill) => skill.value))
                  }
                  className="w-full mt-1 p-2"
                  placeholder="Type and press Enter to add skills"
                />
              )}
            />
            {errors.skills && (
              <p className="text-red-500 text-sm">{errors.skills.message}</p>
            )}
          </div>

          {/* Submit Button */}
          <div className="text-center">
            <button
              type="submit"
              disabled={loading}
              className="bg-blue-500 text-white py-2 px-4 rounded-lg"
            >
              Post Job
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default JobForm;
