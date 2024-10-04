"use client";

import { useForm } from "react-hook-form";
import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";

const page = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    // console.log(data);
    setLoading(true);
    try {
      // Replace with your API endpoint

      //todo: have to change the localhost
      const response = await axios.post(
        "http://localhost:3000/dashboard/addjob/api",
        data
      );
      // console.log(response.data);
      toast.success("Job successfully added!");
      reset(); // Clear form fields after submission
    } catch (error) {
      // console.error(error);
      toast.error("Error adding the job.");
    } finally {
      setLoading(false);
    }
  };

  const inputField = `w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500`;

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6 px-2 mx-auto py-10"
    >
      <h1 className="text-2xl font-semibold mb-4">Add Job</h1>

      {/* Job Information */}
      <div>
        <h2 className="text-lg font-semibold">Job Information</h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <label className="block">Job Title</label>
            <input
              {...register("jobTitle", { required: "Job title is required" })}
              className={inputField}
              placeholder="Job Title"
            />
            {errors.jobTitle && (
              <span className="text-red-500">{errors.jobTitle.message}</span>
            )}
          </div>

          <div>
            <label className="block">Job Type</label>
            <select
              {...register("jobType", { required: "Job type is required" })}
              className={inputField}
            >
              <option value="">Select Job Type</option>
              <option value="Full-time">Full-time</option>
              <option value="Part-time">Part-time</option>
              <option value="Contract">Contract</option>
              <option value="Temporary">Temporary</option>
              <option value="Internship">Internship</option>
              <option value="Remote">Remote</option>
            </select>
            {errors.jobType && (
              <span className="text-red-500">{errors.jobType.message}</span>
            )}
          </div>

          <div>
            <label className="block">Job Category</label>
            <input
              {...register("jobCategory", {
                required: "Job category is required",
              })}
              className={inputField}
              placeholder="Job Category"
            />
            {errors.jobCategory && (
              <span className="text-red-500">{errors.jobCategory.message}</span>
            )}
          </div>

          <div>
            <label className="block">Job Location</label>
            <input
              {...register("jobLocation", {
                required: "Job location is required",
              })}
              className={inputField}
              placeholder="Job Location"
            />
            {errors.jobLocation && (
              <span className="text-red-500">{errors.jobLocation.message}</span>
            )}
          </div>

          <div>
            <label className="block">Salary/Pay Range</label>
            <input
              {...register("salaryRange", {
                required: "Salary range is required",
              })}
              className={inputField}
              placeholder="e.g. $40,000 - $60,000"
            />
            {errors.salaryRange && (
              <span className="text-red-500">{errors.salaryRange.message}</span>
            )}
          </div>

          <div>
            <label className="block">Application Deadline</label>
            <input
              type="date"
              {...register("applicationDeadline", {
                required: "Application deadline is required",
              })}
              className={inputField}
            />
            {errors.applicationDeadline && (
              <span className="text-red-500">
                {errors.applicationDeadline.message}
              </span>
            )}
          </div>

          <div className="md:col-span-2">
            <label className="block">Job Description</label>
            <textarea
              {...register("jobDescription", {
                required: "Job description is required",
              })}
              className={inputField}
              rows="4"
              placeholder="Job Description"
            />
            {errors.jobDescription && (
              <span className="text-red-500">
                {errors.jobDescription.message}
              </span>
            )}
          </div>

          <div className="md:col-span-2">
            <label className="block">Job Requirements</label>
            <textarea
              {...register("jobRequirements", {
                required: "Job requirements are required",
              })}
              className={inputField}
              rows="4"
              placeholder="Job Requirements (Skills, experience, qualifications)"
            />
            {errors.jobRequirements && (
              <span className="text-red-500">
                {errors.jobRequirements.message}
              </span>
            )}
          </div>

          <div className="md:col-span-2">
            <label className="block">Work Schedule</label>
            <input
              {...register("workSchedule")}
              className={inputField}
              placeholder="e.g. Monday-Friday, Weekends, Shifts"
            />
          </div>
        </div>
      </div>

      {/* Company Information */}
      <div>
        <h2 className="text-lg font-semibold">Company Information</h2>
        <div className="grid grid-cols-1 gap-4">
          <div>
            <label className="block">Company Name</label>
            <input
              {...register("companyName", {
                required: "Company name is required",
              })}
              className={inputField}
              placeholder="Company Name"
            />
            {errors.companyName && (
              <span className="text-red-500">{errors.companyName.message}</span>
            )}
          </div>

          <div>
            <label className="block">Company Website</label>
            <input
              type="url"
              {...register("companyWebsite")}
              className={inputField}
              placeholder="Company Website"
            />
          </div>

          <div>
            <label className="block">Company Description</label>
            <textarea
              {...register("companyDescription")}
              className={inputField}
              rows="3"
              placeholder="Company Overview"
            />
          </div>

          <div>
            <label className="block">Industry</label>
            <select {...register("industry")} className={inputField}>
              <option value="">Select Industry</option>
              <option value="Tech">Tech</option>
              <option value="Finance">Finance</option>
              <option value="Healthcare">Healthcare</option>
            </select>
          </div>
        </div>
      </div>

      {/* Contact Information */}
      <div>
        <h2 className="text-lg font-semibold">Contact Information</h2>
        <div className="grid grid-cols-1 gap-4">
          <div>
            <label className="block">Recruiter Name</label>
            <input
              {...register("recruiterName", {
                required: "Recruiter name is required",
              })}
              className={inputField}
              placeholder="Recruiter Name"
            />
            {errors.recruiterName && (
              <span className="text-red-500">
                {errors.recruiterName.message}
              </span>
            )}
          </div>

          <div>
            <label className="block">Email Address</label>
            <input
              type="email"
              {...register("email", { required: "Email is required" })}
              className={inputField}
              placeholder="Email"
            />
            {errors.email && (
              <span className="text-red-500">{errors.email.message}</span>
            )}
          </div>

          <div>
            <label className="block">Phone Number (Optional)</label>
            <input
              type="tel"
              {...register("phone")}
              className={inputField}
              placeholder="Phone Number (Optional)"
            />
          </div>
        </div>
      </div>

      {/* Job Preferences */}
      <div>
        <h2 className="text-lg font-semibold">Job Preferences</h2>
        <div className="grid grid-cols-1 gap-4">
          <div>
            <label className="block">Experience Level</label>
            <select {...register("experienceLevel")} className={inputField}>
              <option value="">Select Experience Level</option>
              <option value="Entry-level">Entry-level</option>
              <option value="Mid-level">Mid-level</option>
              <option value="Senior-level">Senior-level</option>
            </select>
          </div>

          <div>
            <label className="block">Years of Experience</label>
            <input
              type="number"
              {...register("yearsOfExperience")}
              className={inputField}
              placeholder="Years of Experience"
            />
          </div>

          <div>
            <label className="block">Skills</label>
            <textarea
              {...register("skills")}
              className={inputField}
              rows="3"
              placeholder="Required Skills"
            />
          </div>

          <div>
            <label className="block">Languages</label>
            <input
              {...register("languages")}
              className={inputField}
              placeholder="Languages"
            />
          </div>

          <div>
            <label className="block">Certifications</label>
            <input
              {...register("certifications")}
              className={inputField}
              placeholder="Certifications"
            />
          </div>
        </div>
      </div>

      {/* Job Perks/Benefits */}
      <div>
        <h2 className="text-lg font-semibold">Job Perks/Benefits</h2>
        <textarea
          {...register("benefits")}
          className={inputField}
          rows="3"
          placeholder="Benefits (e.g., Health insurance, retirement plans)"
        />
      </div>

      {/* Application Process */}
      <div>
        <h2 className="text-lg font-semibold">Application Process</h2>
        <div className="grid grid-cols-1 gap-4">
          <div>
            <label className="block">Application Method</label>
            <select {...register("applicationMethod")} className={inputField}>
              <option value="">Select Method</option>
              <option value="Online form">Online form</option>
              <option value="Email submission">Email submission</option>
              <option value="Through platform">Through platform</option>
            </select>
          </div>

          <div>
            <label className="block">Additional Documents</label>
            <input
              {...register("additionalDocuments")}
              className={inputField}
              placeholder="Additional Documents (e.g., resumes, portfolios)"
            />
          </div>

          <div>
            <label className="block">Recruitment Stage</label>
            <input
              {...register("recruitmentStage")}
              className={inputField}
              placeholder="Recruitment Stage (e.g., interviews, assessments)"
            />
          </div>
        </div>
      </div>

      {/* Submit Button */}
      <div className="flex justify-end">
        <button
          type="submit"
          className={`bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-600 ${
            loading ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={loading}
        >
          {loading ? "Submitting..." : "Submit Job"}
        </button>
      </div>
    </form>
  );
};

export default page;
