"use client"; // This must be the first line in your file

import React from "react";

// Sample Fake Data
const fakeData = {
  users: {
    total: 4200,
    active: 3000,
    inactive: 1200,
    seekers: 2000,
    recruiters: 2200,
  },
  jobs: {
    posted: 1500,
    applied: 750,
    pending: 300,
  },
};

const StatisticsPage = () => {
  const { users, jobs } = fakeData;

  return (
    <section className="container mx-auto px-6 py-8">
      <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">JobSphere Admin Dashboard</h2>
      <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
        Monitor and manage your platform&rsquo;s performance with key statistics.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Total Users */}
        <div className="stat bg-white shadow-md rounded-lg p-6">
          <div className="stat-figure text-primary">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="inline-block h-10 w-10 stroke-current">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div className="stat-title text-gray-700">Total Users</div>
          <div className="stat-value text-2xl font-bold">{users.total}</div>
          <div className="stat-desc text-gray-500">Total registered users</div>
        </div>

        {/* Active Users */}
        <div className="stat bg-white shadow-md rounded-lg p-6">
          <div className="stat-figure text-success">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="inline-block h-10 w-10 stroke-current">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
            </svg>
          </div>
          <div className="stat-title text-gray-700">Active Users</div>
          <div className="stat-value text-2xl font-bold">{users.active}</div>
          <div className="stat-desc text-gray-500">Users currently active</div>
        </div>

        {/* Total Posted Jobs */}
        <div className="stat bg-white shadow-md rounded-lg p-6">
          <div className="stat-figure text-secondary">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="inline-block h-10 w-10 stroke-current">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
            </svg>
          </div>
          <div className="stat-title text-gray-700">Total Posted Jobs</div>
          <div className="stat-value text-2xl font-bold">{jobs.posted}</div>
          <div className="stat-desc text-gray-500">Jobs posted by recruiters</div>
        </div>

        {/* Total Applications */}
        <div className="stat bg-white shadow-md rounded-lg p-6">
          <div className="stat-figure text-warning">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="inline-block h-10 w-10 stroke-current">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
          <div className="stat-title text-gray-700">Total Applications</div>
          <div className="stat-value text-2xl font-bold">{jobs.applied}</div>
          <div className="stat-desc text-gray-500">Jobs applied by seekers</div>
        </div>

        {/* Pending Jobs */}
        <div className="stat bg-white shadow-md rounded-lg p-6">
          <div className="stat-figure text-error">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="inline-block h-10 w-10 stroke-current">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 8v4m0 0v4m0-4H8m4 0h4" />
            </svg>
          </div>
          <div className="stat-title text-gray-700">Pending Jobs</div>
          <div className="stat-value text-2xl font-bold">{jobs.pending}</div>
          <div className="stat-desc text-gray-500">Jobs waiting for approval</div>
        </div>
      </div>
    </section>
  );
};

export default StatisticsPage;
