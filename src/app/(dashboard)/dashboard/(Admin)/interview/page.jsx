"use client"; // This must be the first line in your file

import React, { useState } from "react";

// Sample Fake Data for Interviews
const interviewData = [
  {
    id: 1,
    candidateName: "Alice Johnson",
    jobTitle: "Frontend Developer",
    date: "2024-10-15",
    time: "10:00 AM",
    status: "Scheduled",
  },
  {
    id: 2,
    candidateName: "Bob Smith",
    jobTitle: "Backend Developer",
    date: "2024-10-16",
    time: "02:00 PM",
    status: "Scheduled",
  },
  {
    id: 3,
    candidateName: "Jane Doe",
    jobTitle: "UX Designer",
    date: "2024-10-17",
    time: "01:00 PM",
    status: "Completed",
  },
];

const InterviewScheduling = () => {
  const [interviews, setInterviews] = useState(interviewData);
  const [newInterview, setNewInterview] = useState({
    candidateName: "",
    jobTitle: "",
    date: "",
    time: "",
    status: "Scheduled",
  });

  const handleAddInterview = (e) => {
    e.preventDefault();
    if (!newInterview.candidateName || !newInterview.jobTitle || !newInterview.date || !newInterview.time) {
      alert("Please fill in all fields.");
      return;
    }

    setInterviews((prevInterviews) => [
      ...prevInterviews,
      { ...newInterview, id: prevInterviews.length + 1 },
    ]);
    setNewInterview({ candidateName: "", jobTitle: "", date: "", time: "", status: "Scheduled" });
  };

  const handleDeleteInterview = (id) => {
    setInterviews(interviews.filter((interview) => interview.id !== id));
  };

  return (
    <section className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Interview Scheduling</h2>

      <form onSubmit={handleAddInterview} className="mb-6">
        <input
          type="text"
          placeholder="Candidate Name"
          value={newInterview.candidateName}
          onChange={(e) => setNewInterview({ ...newInterview, candidateName: e.target.value })}
          className="border rounded-md p-2 mr-2"
          required
        />
        <input
          type="text"
          placeholder="Job Title"
          value={newInterview.jobTitle}
          onChange={(e) => setNewInterview({ ...newInterview, jobTitle: e.target.value })}
          className="border rounded-md p-2 mr-2"
          required
        />
        <input
          type="date"
          value={newInterview.date}
          onChange={(e) => setNewInterview({ ...newInterview, date: e.target.value })}
          className="border rounded-md p-2 mr-2"
          required
        />
        <input
          type="time"
          value={newInterview.time}
          onChange={(e) => setNewInterview({ ...newInterview, time: e.target.value })}
          className="border rounded-md p-2 mr-2"
          required
        />
        <button type="submit" className="bg-blue-500 text-white rounded-md p-2">
          Add Interview
        </button>
      </form>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-200">
            <tr>
              <th className="py-4 px-6 text-sm font-semibold text-left">Candidate Name</th>
              <th className="py-4 px-6 text-sm font-semibold text-left">Job Title</th>
              <th className="py-4 px-6 text-sm font-semibold text-left">Date</th>
              <th className="py-4 px-6 text-sm font-semibold text-left">Time</th>
              <th className="py-4 px-6 text-sm font-semibold text-left">Status</th>
              <th className="py-4 px-6 text-sm font-semibold text-left">Action</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {interviews.map((interview) => (
              <tr key={interview.id}>
                <td className="px-6 py-4">{interview.candidateName}</td>
                <td className="px-6 py-4">{interview.jobTitle}</td>
                <td className="px-6 py-4">{interview.date}</td>
                <td className="px-6 py-4">{interview.time}</td>
                <td className="px-6 py-4">{interview.status}</td>
                <td className="px-6 py-4">
                  <button className="text-red-500" onClick={() => handleDeleteInterview(interview.id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default InterviewScheduling;
