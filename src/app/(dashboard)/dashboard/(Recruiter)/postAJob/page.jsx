import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const PostAJob = () => {
  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm();
  const [skills, setSkills] = useState([]);
  const [skillInput, setSkillInput] = useState('');
  const [today] = useState(new Date());

  const onSubmit = (data) => {
    // Combine the form data with skills array
    data.skills = skills;
    console.log(data); // Handle the form data submission (send to backend)
  };

  // Function to add skills
  const addSkill = () => {
    if (skillInput.trim() !== '') {
      setSkills([...skills, skillInput]);
      setSkillInput('');
    }
  };

  // Function to remove skill
  const removeSkill = (skillToRemove) => {
    setSkills(skills.filter((skill) => skill !== skillToRemove));
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-lg w-full">
        <h1 className="text-2xl font-bold mb-6 text-center">Post a Job</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Job Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Job Title</label>
            <input
              type="text"
              {...register('jobTitle', { required: true })}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            />
            {errors.jobTitle && <p className="text-red-500 text-sm">Job title is required.</p>}
          </div>

          {/* Vacancy */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Vacancy</label>
            <input
              type="number"
              {...register('vacancy', { required: true, min: 1 })}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            />
            {errors.vacancy && <p className="text-red-500 text-sm">Vacancy is required.</p>}
          </div>

          {/* Location Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Location Type</label>
            <select
              {...register('locationType', { required: true })}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            >
              <option value="">Select Location Type</option>
              <option value="Remote">Remote</option>
              <option value="On-Site">On-Site</option>
              <option value="Hybrid">Hybrid</option>
            </select>
            {errors.locationType && <p className="text-red-500 text-sm">Location type is required.</p>}
          </div>

          {/* Job Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Job Type</label>
            <select
              {...register('jobType', { required: true })}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            >
              <option value="">Select Job Type</option>
              <option value="Full-Time">Full-Time</option>
              <option value="Part-Time">Part-Time</option>
              <option value="Contract">Contract</option>
            </select>
            {errors.jobType && <p className="text-red-500 text-sm">Job type is required.</p>}
          </div>

          {/* Salary */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Salary</label>
            <input
              type="text"
              {...register('salaryScale', { required: true })}
              placeholder="$80,000 - $100,000"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            />
            {errors.salaryScale && <p className="text-red-500 text-sm">Salary is required.</p>}
          </div>

          {/* Education */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Education</label>
            <input
              type="text"
              {...register('education', { required: true })}
              placeholder="Bachelor's Degree in..."
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            />
            {errors.education && <p className="text-red-500 text-sm">Education is required.</p>}
          </div>

          {/* Experience */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Experience (Years)</label>
            <input
              type="number"
              {...register('experience', { required: true, min: 0 })}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            />
            {errors.experience && <p className="text-red-500 text-sm">Experience is required.</p>}
          </div>

          {/* Deadline */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Deadline</label>
            <Controller
              control={control}
              name="deadline"
              rules={{ required: true }}
              render={({ field }) => (
                <DatePicker
                  {...field}
                  selected={field.value}
                  onChange={(date) => setValue('deadline', date)}
                  minDate={today}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                  dateFormat="dd/MM/yyyy"
                />
              )}
            />
            {errors.deadline && <p className="text-red-500 text-sm">Deadline is required.</p>}
          </div>

          {/* Skills */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Skills</label>
            <div className="flex items-center space-x-2">
              <input
                type="text"
                value={skillInput}
                onChange={(e) => setSkillInput(e.target.value)}
                placeholder="Type a skill and press Enter"
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addSkill())}
              />
              <button
                type="button"
                onClick={addSkill}
                className="bg-blue-500 text-white px-3 py-2 rounded-md"
              >
                Add
              </button>
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
              {skills.map((skill, index) => (
                <div
                  key={index}
                  className="bg-gray-200 px-3 py-1 rounded-full flex items-center space-x-2"
                >
                  <span>{skill}</span>
                  <button
                    type="button"
                    onClick={() => removeSkill(skill)}
                    className="text-red-500 font-bold"
                  >
                    &times;
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-3 rounded-md hover:bg-blue-600 transition-all"
          >
            Post Job
          </button>
        </form>
      </div>
    </div>
  );
};

export default PostAJob;


// const jobs = [{
//         "_id": "66f623533ca31127c42ba950",
//         "summary": {
//           "jobTitle": "Backend Developer",
//           "vacancy": 3,
//           "location": "Remote",
//           "jobType": "Remote",
//           "salaryScale": "$80,000 - $100,000",
//           "experienceNeed": "4 Years"
//         },
//         "requirement": {
//           "education": "Bachelor's Degree in Computer Science or related field",
//           "experience": "4 Years",
//           "additionalRequirements": "Proficient in Node.js, SQL, and AWS.",
//           "responsibility": "Developing server-side logic and database management.",
//           "benefits": "Competitive salary and health benefits."
//         },
//         "companyDetails": {
//           "companyName": "DevCore",
//           "type": "Hybrid",
//           "headOffice": "321 Dev St, Seattle, WA",
//           "workArea": "Software Development",
//           "contact": {
//             "mobileNo": "+1 (321) 654-0987",
//             "email": "info@devcore.com",
//             "website": "www.devcore.com"
//           }
//         },
//         "applyProcess": {
//           "needToDoForApply": "Email your CV to our HR department.",
//           "others": "Mention relevant experience in your application."
//         },
//         "postedDate": "18 Sept 2024",
//         "deadline": "24 Sept 2024",
//         "skills": [
//           "Node.js",
//           "SQL",
//           "AWS"
//         ]
//       }]
      
    
